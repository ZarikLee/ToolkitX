import mysql from "mysql2/promise";

async function migrate() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.log("No DATABASE_URL, skipping migration");
    return;
  }

  const conn = await mysql.createConnection(url);
  console.log("Connected to MySQL, checking schema...");

  const [columns] = await conn.execute(
    "SHOW COLUMNS FROM `User` LIKE 'role'"
  );

  if ((columns as any[]).length === 0) {
    console.log("Adding 'role' column to User table...");
    await conn.execute(
      "ALTER TABLE `User` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user'"
    );
    console.log("✅ 'role' column added");
  } else {
    console.log("✅ 'role' column already exists");
  }

  const [tables] = await conn.execute(
    "SHOW TABLES LIKE 'Message'"
  );

  if ((tables as any[]).length === 0) {
    console.log("Creating Message table...");
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS \`Message\` (
        \`id\` VARCHAR(191) NOT NULL,
        \`title\` VARCHAR(191) NOT NULL,
        \`content\` TEXT NOT NULL,
        \`type\` VARCHAR(191) NOT NULL DEFAULT 'info',
        \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        PRIMARY KEY (\`id\`)
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);
    console.log("✅ Message table created");
  }

  const [msgReadTables] = await conn.execute(
    "SHOW TABLES LIKE 'MessageRead'"
  );

  if ((msgReadTables as any[]).length === 0) {
    console.log("Creating MessageRead table...");
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS \`MessageRead\` (
        \`id\` VARCHAR(191) NOT NULL,
        \`messageId\` VARCHAR(191) NOT NULL,
        \`userId\` VARCHAR(191) NOT NULL,
        \`read\` BOOLEAN NOT NULL DEFAULT false,
        \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`MessageRead_messageId_userId_key\` (\`messageId\`, \`userId\`)
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);
    console.log("✅ MessageRead table created");
  }

  const [fbTables] = await conn.execute(
    "SHOW TABLES LIKE 'Feedback'"
  );

  if ((fbTables as any[]).length === 0) {
    console.log("Creating Feedback table...");
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS \`Feedback\` (
        \`id\` VARCHAR(191) NOT NULL,
        \`userId\` VARCHAR(191) NOT NULL,
        \`type\` VARCHAR(191) NOT NULL DEFAULT 'suggestion',
        \`title\` VARCHAR(191) NOT NULL,
        \`content\` TEXT NOT NULL,
        \`status\` VARCHAR(191) NOT NULL DEFAULT 'pending',
        \`reply\` VARCHAR(191),
        \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        \`updatedAt\` DATETIME(3) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);
    console.log("✅ Feedback table created");
  }

  await conn.end();
  console.log("✅ Migration complete");
}

migrate().catch((e) => {
  console.error("Migration failed:", e.message);
  process.exit(1);
});
