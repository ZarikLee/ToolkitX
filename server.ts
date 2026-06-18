import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { WebSocketServer, WebSocket } from 'ws';
import { Client } from 'ssh2';
import { createSSHConnection, closeConnection, writeToStream, resizeStream } from './src/lib/ssh';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (req, socket, head) => {
    const { pathname } = parse(req.url || '/', true);

    if (pathname === '/api/ssh') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('connection', (ws: WebSocket) => {
    let connectionId: string | null = null;

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString());

        switch (data.type) {
          case 'connect':
            try {
              const { id, stream } = await createSSHConnection({
                host: data.host,
                port: data.port,
                username: data.username,
                password: data.password,
                privateKey: data.privateKey,
              });

              connectionId = id;

              ws.send(JSON.stringify({ type: 'connected' }));

              stream.on('data', (chunk: Buffer) => {
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ type: 'data', data: chunk.toString() }));
                }
              });

              stream.on('close', () => {
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ type: 'disconnected' }));
                  ws.close();
                }
              });

              stream.stderr.on('data', (chunk: Buffer) => {
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ type: 'data', data: chunk.toString() }));
                }
              });
            } catch (err) {
              ws.send(JSON.stringify({
                type: 'error',
                message: err instanceof Error ? err.message : 'Connection failed',
              }));
            }
            break;

          case 'data':
            if (connectionId) {
              writeToStream(connectionId, data.data);
            }
            break;

          case 'resize':
            if (connectionId) {
              resizeStream(connectionId, data.cols, data.rows);
            }
            break;

          case 'disconnect':
            if (connectionId) {
              closeConnection(connectionId);
              connectionId = null;
            }
            break;

          case 'exec':
            try {
              const execConn = new Client();
              execConn.on('ready', () => {
                execConn.exec(data.command, { pty: false }, (err, stream) => {
                  if (err) {
                    ws.send(JSON.stringify({ type: 'exec_error', requestId: data.requestId, error: err.message }));
                    execConn.end();
                    return;
                  }
                  let stdout = '';
                  let stderr = '';
                  stream.on('data', (chunk: Buffer) => {
                    stdout += chunk.toString();
                  });
                  stream.stderr.on('data', (chunk: Buffer) => {
                    stderr += chunk.toString();
                  });
                  stream.on('close', () => {
                    ws.send(JSON.stringify({ type: 'exec_result', requestId: data.requestId, stdout, stderr, code: 0 }));
                    execConn.end();
                  });
                });
              });
              execConn.on('error', (err) => {
                ws.send(JSON.stringify({ type: 'exec_error', requestId: data.requestId, error: err.message }));
              });
              const execConfig: any = {
                host: data.host,
                port: data.port || 22,
                username: data.username,
              };
              if (data.privateKey) execConfig.privateKey = data.privateKey;
              else if (data.password) execConfig.password = data.password;
              execConn.connect(execConfig);
            } catch (err) {
              ws.send(JSON.stringify({ type: 'exec_error', requestId: data.requestId, error: err instanceof Error ? err.message : 'Exec failed' }));
            }
            break;

          case 'tail_start':
            try {
              const tailConn = new Client();
              tailConn.on('ready', () => {
                const tailCmd = `tail -n ${data.lines || 100} -f ${data.file}`;
                tailConn.exec(tailCmd, { pty: false }, (err, stream) => {
                  if (err) {
                    ws.send(JSON.stringify({ type: 'tail_error', error: err.message }));
                    tailConn.end();
                    return;
                  }
                  ws.send(JSON.stringify({ type: 'tail_connected' }));
                  stream.on('data', (chunk: Buffer) => {
                    if (ws.readyState === WebSocket.OPEN) {
                      ws.send(JSON.stringify({ type: 'tail_data', data: chunk.toString() }));
                    }
                  });
                  stream.stderr.on('data', (chunk: Buffer) => {
                    if (ws.readyState === WebSocket.OPEN) {
                      ws.send(JSON.stringify({ type: 'tail_error', error: chunk.toString() }));
                    }
                  });
                  (ws as any)._tailConn = tailConn;
                  (ws as any)._tailStream = stream;
                });
              });
              tailConn.on('error', (err) => {
                ws.send(JSON.stringify({ type: 'tail_error', error: err.message }));
              });
              const tailConfig: any = {
                host: data.host,
                port: data.port || 22,
                username: data.username,
              };
              if (data.privateKey) tailConfig.privateKey = data.privateKey;
              else if (data.password) tailConfig.password = data.password;
              tailConn.connect(tailConfig);
            } catch (err) {
              ws.send(JSON.stringify({ type: 'tail_error', error: err instanceof Error ? err.message : 'Tail failed' }));
            }
            break;

          case 'tail_stop':
            if ((ws as any)._tailStream) {
              (ws as any)._tailStream.close();
              (ws as any)._tailStream = null;
            }
            if ((ws as any)._tailConn) {
              (ws as any)._tailConn.end();
              (ws as any)._tailConn = null;
            }
            break;
        }
      } catch (err) {
        console.error('WebSocket message error:', err);
      }
    });

    ws.on('close', () => {
      if ((ws as any)._tailStream) {
        try { (ws as any)._tailStream.close(); } catch (e) {}
      }
      if ((ws as any)._tailConn) {
        try { (ws as any)._tailConn.end(); } catch (e) {}
      }
      if (connectionId) {
        closeConnection(connectionId);
        connectionId = null;
      }
    });

    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
      if (connectionId) {
        closeConnection(connectionId);
        connectionId = null;
      }
    });
  });

  server.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
