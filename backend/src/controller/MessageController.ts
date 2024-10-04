// // src/controller/MessageController.ts

// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// class MessageController {
//   // Criar uma nova mensagem
//   async createMessage(req: Request, res: Response) {
//     const { institutionId, content } = req.body;
//     const userId = req.userId; // Usando `req.userId` ao invés de `req.user`

//     if (!userId) {
//       return res.status(401).json({ message: 'Usuário não autenticado.' });
//     }

//     try {
//       // Cria a mensagem associada à instituição e ao usuário autenticado
//       const newMessage = await prisma.message.create({
//         data: {
//           content: content,
//           institutionId: Number(institutionId),
//           userId: Number(userId), // Garante que o userId seja um número
//           isUser: true, // Marca que a mensagem foi enviada pelo usuário
//         },
//       });

//       return res.status(201).json(newMessage);
//     } catch (error) {
//       console.error('Erro ao criar mensagem:', error);
//       return res.status(500).json({ message: 'Erro ao criar a mensagem.' });
//     }
//   }

//   // Listar mensagens entre um usuário e uma instituição
//   async getMessagesByInstitution(req: Request, res: Response) {
//     const { institutionId } = req.params;
//     const userId = req.userId; // Usando `req.userId`

//     if (!userId) {
//       return res.status(401).json({ message: 'Usuário não autenticado.' });
//     }

//     try {
//       const messages = await prisma.message.findMany({
//         where: {
//           institutionId: Number(institutionId),
//           userId: Number(userId), // Filtra para o usuário autenticado
//         },
//         orderBy: {
//           createdAt: 'asc', // Ordena as mensagens pela data de criação
//         },
//       });

//       return res.status(200).json(messages);
//     } catch (error) {
//       console.error('Erro ao buscar mensagens:', error);
//       return res.status(500).json({ message: 'Erro ao buscar as mensagens.' });
//     }
//   }

//   // (Opcional) Listar todas as mensagens de um usuário (em todas as instituições)
//   async getMessagesByUser(req: Request, res: Response) {
//     const userId = req.userId; // Usando `req.userId`

//     if (!userId) {
//       return res.status(401).json({ message: 'Usuário não autenticado.' });
//     }

//     try {
//       const messages = await prisma.message.findMany({
//         where: {
//           userId: Number(userId),
//         },
//         orderBy: {
//           createdAt: 'asc',
//         },
//       });

//       return res.status(200).json(messages);
//     } catch (error) {
//       console.error('Erro ao buscar mensagens do usuário:', error);
//       return res.status(500).json({ message: 'Erro ao buscar as mensagens.' });
//     }
//   }
// }

// export default new MessageController();
