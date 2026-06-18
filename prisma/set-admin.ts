import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function setAdmin() {
  const email = "2338240737@qq.com";
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { role: "admin" },
    });
    console.log(`✅ ${email} 已设为管理员`);
  } else {
    console.log(`⚠️ 用户 ${email} 不存在，跳过（请先注册）`);
  }

  await prisma.$disconnect();
}

setAdmin().catch((e) => {
  console.error(e);
  process.exit(1);
});
