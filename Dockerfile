FROM node:20

WORKDIR /app

COPY package.json ./
RUN rm -f package-lock.json && npm install

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npx prisma generate
RUN npm run build -- --webpack

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push --accept-data-loss 2>&1 && npx tsx prisma/set-admin.ts 2>&1; exec npx tsx server.ts"]
