import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { hash } from "bcryptjs";

export class UserController {
    async index(req: Request, res: Response) {
        const users = await prisma.user.findMany();
        return res.json({ users });
    }

    async store(req: Request, res: Response) {
        const { name, email, password } = req.body;

        // Aqui ele pesquisa o email
        const userExist = await prisma.user.findUnique({
            where: { email },
        });

        // Valida a existência do email
        if (userExist) {
            return res.json({ error: "User já existente" });
        }

        const hash_password = await hash(password, 8);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hash_password,
            },
        });
        return res.json({ user });
    }

    async deleteAccount(req: Request, res: Response) {
        const userId = Number(req.userId); // Converte userId para número

        try {
            await prisma.user.delete({ where: { id: userId } });
            return res.json({ message: "Conta deletada com Sucesso" });
        } catch (error) {
            return res.status(500).json({ error: "Falha ao deletar conta" });
        }
    }

    async update(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const userId = Number(req.userId);  // Convertendo userId para número
    
        try {
            const updates: any = {};  
    
            // Adiciona os dados ao objeto de atualizações se estiverem presentes
            if (name) updates.name = name;
            if (email) updates.email = email;
            if (password) updates.password = await hash(password, 8);
    
            // Verifica se uma nova foto foi enviada
            if (req.file) {
                updates.foto = req.file.filename; // Armazena apenas o nome do arquivo
            }
    
            // Atualiza o usuário no banco de dados
            const updatedUser = await prisma.user.update({
                where: { id: userId }, 
                data: updates,
            });
    
            // Cria a URL completa para a foto do usuário, se existir
            if (updatedUser.foto) {
                updatedUser.foto = `http://localhost:3333/uploads/users/${updatedUser.foto}`; // Ajuste para a URL correta
            }
            
    
            return res.json({ user: updatedUser });
        } catch (error) {
            console.error(error); // Adiciona log de erro
            return res.status(500).json({ error: "Failed to update user" });
        }
    }
    // Novo método para buscar um usuário específico e suas instituições
    async show(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    institutions: true,  // Inclui as instituições do usuário
                },
            });

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            return res.json({ user, institutions: user.institutions });
        } catch (error) {
            console.error("Erro ao buscar informações do usuário:", error);
            return res.status(500).json({ error: 'Erro ao buscar informações do usuário' });
        }
    }
}
