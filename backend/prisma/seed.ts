// Importa a instância do Prisma para interagir com o banco de dados
import { prisma } from "../src/utils/prisma";
// Importa a função 'hash' da biblioteca bcryptjs para criptografar a senha
import { hash } from 'bcryptjs';

async function main() {
  // Criptografa a senha 'admin' com um sal (fator de complexidade) de 8
  const adminPassword = await hash('admin', 8);

  // Verifica se o usuário admin já existe no banco de dados
  const admin = await prisma.user.upsert({
    // Condição de busca para verificar se o usuário com o email 'admin@gmail.com' já existe
    where: { email: 'admin@gmail.com' },
    // Caso o usuário já exista, não há alteração (campo 'update' vazio)
    update: {},
    // Caso o usuário não exista, cria um novo usuário com as informações fornecidas
    create: {
      name: 'Admin',               // Nome do usuário
      email: 'admin@gmail.com',     // Email do usuário
      password: adminPassword,      // Senha criptografada do usuário
      isAdmin: true,                // Define que este usuário será um administrador
    },
  });

  // Exibe no console a informação sobre o usuário administrador criado ou encontrado
  console.log('Usuário administrador criado:', admin);
}

// Executa a função principal
main()
  .catch((e) => {
    // Em caso de erro, imprime a mensagem de erro e encerra o processo
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Desconecta-se do banco de dados após a execução
    await prisma.$disconnect();
  });
