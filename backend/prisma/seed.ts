import { prisma } from "../src/utils/prisma";
import { hash } from 'bcryptjs';

async function main() {
  const adminPassword = await hash('admin', 8);

  // Verifique se o usuário admin já existe antes de criá-lo
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},  // Se já existir, não faça nada
    create: {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: adminPassword,
      isAdmin: true,  // Define que esse usuário é administrador
    },
  });

  console.log('Usuário administrador criado:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
