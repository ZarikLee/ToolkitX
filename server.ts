import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { WebSocketServer, WebSocket } from 'ws';
import { Client } from 'ssh2';
import { createSSHConnection, closeConnection, writeToStream, resizeStream } from './src/lib/ssh';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

async function runMigration() {
  const url = process.env.DATABASE_URL;
  if (!url) return;
  try {
    const mysql = await import('mysql2/promise');
    const conn = await mysql.createConnection(url);
    const [cols] = await conn.execute("SHOW COLUMNS FROM `User` LIKE 'role'");
    if ((cols as any[]).length === 0) {
      await conn.execute("ALTER TABLE `User` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user'");
      console.log('[migration] Added role column');
    }
    for (const table of ['Message', 'MessageRead', 'Feedback']) {
      const [t] = await conn.execute(`SHOW TABLES LIKE '${table}'`);
      if ((t as any[]).length === 0) {
        if (table === 'Message') {
          await conn.execute("CREATE TABLE IF NOT EXISTS `Message` (`id` VARCHAR(191) NOT NULL,`title` VARCHAR(191) NOT NULL,`content` TEXT NOT NULL,`type` VARCHAR(191) NOT NULL DEFAULT 'info',`createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),PRIMARY KEY (`id`)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        } else if (table === 'MessageRead') {
          await conn.execute("CREATE TABLE IF NOT EXISTS `MessageRead` (`id` VARCHAR(191) NOT NULL,`messageId` VARCHAR(191) NOT NULL,`userId` VARCHAR(191) NOT NULL,`read` BOOLEAN NOT NULL DEFAULT false,`createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),PRIMARY KEY (`id`),UNIQUE KEY `MessageRead_messageId_userId_key` (`messageId`,`userId`)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        } else if (table === 'Feedback') {
          await conn.execute("CREATE TABLE IF NOT EXISTS `Feedback` (`id` VARCHAR(191) NOT NULL,`userId` VARCHAR(191) NOT NULL,`type` VARCHAR(191) NOT NULL DEFAULT 'suggestion',`title` VARCHAR(191) NOT NULL,`content` TEXT NOT NULL,`status` VARCHAR(191) NOT NULL DEFAULT 'pending',`reply` VARCHAR(191),`createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),`updatedAt` DATETIME(3) NOT NULL,PRIMARY KEY (`id`)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        }
        console.log(`[migration] Created ${table} table`);
      }
    }
    // Create new tables for smart monitoring
    const newTables = [
      "CREATE TABLE IF NOT EXISTS `ConfigBaseline` (`id` VARCHAR(191) NOT NULL,`userId` VARCHAR(191) NOT NULL,`filePath` VARCHAR(191) NOT NULL,`fileName` VARCHAR(191) NOT NULL,`hash` VARCHAR(191) NOT NULL,`content` LONGTEXT NOT NULL,`enabled` BOOLEAN NOT NULL DEFAULT true,`lastCheck` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),`createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),`updatedAt` DATETIME(3) NOT NULL,PRIMARY KEY (`id`)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
      "CREATE TABLE IF NOT EXISTS `ConfigDrift` (`id` VARCHAR(191) NOT NULL,`baselineId` VARCHAR(191) NOT NULL,`oldHash` VARCHAR(191) NOT NULL,`newHash` VARCHAR(191) NOT NULL,`oldContent` LONGTEXT NOT NULL,`newContent` LONGTEXT NOT NULL,`detectedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),PRIMARY KEY (`id`)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
      "CREATE TABLE IF NOT EXISTS `AlertRule` (`id` VARCHAR(191) NOT NULL,`userId` VARCHAR(191) NOT NULL,`name` VARCHAR(191) NOT NULL,`type` VARCHAR(191) NOT NULL,`condition` VARCHAR(191) NOT NULL,`threshold` DOUBLE NOT NULL,`severity` VARCHAR(191) NOT NULL DEFAULT 'warning',`enabled` BOOLEAN NOT NULL DEFAULT true,`cooldown` INT NOT NULL DEFAULT 300,`lastFired` DATETIME(3),`createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),`updatedAt` DATETIME(3) NOT NULL,PRIMARY KEY (`id`)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
    ];
    for (const sql of newTables) {
      await conn.execute(sql);
    }
    console.log('[migration] Created smart monitoring tables');

    // Create advanced features tables
    const advancedTables = [
      "CREATE TABLE IF NOT EXISTS `AuditLog` (`id` VARCHAR(191) NOT NULL,`userId` VARCHAR(191) NOT NULL,`action` VARCHAR(191) NOT NULL,`resource` VARCHAR(191) NOT NULL,`detail` TEXT,`ip` VARCHAR(191),`createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),PRIMARY KEY (`id`)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
      "CREATE TABLE IF NOT EXISTS `CertMonitor` (`id` VARCHAR(191) NOT NULL,`userId` VARCHAR(191) NOT NULL,`domain` VARCHAR(191) NOT NULL,`port` INT NOT NULL DEFAULT 443,`label` VARCHAR(191),`lastCheck` DATETIME(3),`lastStatus` VARCHAR(191),`issuer` VARCHAR(191),`validFrom` DATETIME(3),`validTo` DATETIME(3),`daysLeft` INT,`enabled` BOOLEAN NOT NULL DEFAULT true,`createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),`updatedAt` DATETIME(3) NOT NULL,PRIMARY KEY (`id`)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
    ];
    for (const sql of advancedTables) {
      await conn.execute(sql);
    }
    console.log('[migration] Created advanced features tables');

    // Create SmsCode table
    await conn.execute("CREATE TABLE IF NOT EXISTS `SmsCode` (`id` VARCHAR(191) NOT NULL,`phone` VARCHAR(191) NOT NULL,`code` VARCHAR(191) NOT NULL,`purpose` VARCHAR(191) NOT NULL DEFAULT 'login',`used` BOOLEAN NOT NULL DEFAULT false,`expiresAt` DATETIME(3) NOT NULL,`createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),PRIMARY KEY (`id`),INDEX `SmsCode_phone_purpose_idx` (`phone`,`purpose`)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    console.log('[migration] Created SmsCode table');

    // Add phone column to User if not exists
    const [phoneCol] = await conn.execute("SHOW COLUMNS FROM `User` LIKE 'phone'");
    if ((phoneCol as any[]).length === 0) {
      await conn.execute("ALTER TABLE `User` ADD COLUMN `phone` VARCHAR(191) UNIQUE");
      console.log('[migration] Added phone column to User');
    }

    // Make email and password nullable for phone login
    const [emailCol] = await conn.execute("SHOW COLUMNS FROM `User` LIKE 'email'");
    const emailInfo = (emailCol as any[])[0];
    if (emailInfo && emailInfo.Null === 'NO') {
      await conn.execute("ALTER TABLE `User` MODIFY COLUMN `email` VARCHAR(191) UNIQUE");
      console.log('[migration] Made email nullable');
    }
    const [pwdCol] = await conn.execute("SHOW COLUMNS FROM `User` LIKE 'password'");
    const pwdInfo = (pwdCol as any[])[0];
    if (pwdInfo && pwdInfo.Null === 'NO') {
      await conn.execute("ALTER TABLE `User` MODIFY COLUMN `password` VARCHAR(191)");
      console.log('[migration] Made password nullable');
    }

    await conn.end();
    console.log('[migration] Done');

    const conn2 = await mysql.createConnection(url);
    const [rows] = await conn2.execute("SELECT `id` FROM `User` WHERE `email` = '2338240737@qq.com'");
    if ((rows as any[]).length > 0) {
      await conn2.execute("UPDATE `User` SET `role` = 'admin' WHERE `email` = '2338240737@qq.com'");
      console.log('[admin] 2338240737@qq.com set as admin');
    }
    await conn2.end();
  } catch (e: any) {
    console.error('[migration] Failed:', e.message);
  }
}

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  await runMigration();
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
