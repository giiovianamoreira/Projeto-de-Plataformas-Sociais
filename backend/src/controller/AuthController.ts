// Importa as dependências necessárias
import { Request, Response } from "express";  // Tipos do Express para definir parâmetros de requisição e resposta
import { prisma } from "../utils/prisma";      // Instância do Prisma para interagir com o banco de dados
import { compare, hash } from "bcryptjs";      // Funções para comparar e criptografar senhas
import { sign } from "jsonwebtoken";           // Função para gerar tokens JWT

// Definindo o controlador para autenticação
export class AuthController {

    // Função assíncrona para autenticação de usuário
    async authenticate (req: Request, res: Response) 
    {
        // Extrai os dados de email e senha do corpo da requisição (req.body)
        const { email, password } = req.body;

        // Faz uma busca no banco de dados para encontrar o usuário com o email fornecido
        const user = await prisma.user.findUnique(
            { where: { email } } // Verifica se o usuário com o email existe
        );
        
        // Se o usuário não for encontrado, retorna uma mensagem de erro
        if (!user) {
            return res.json({ error: "User not found" }); // Retorna erro se o usuário não for encontrado
        }

        // Compara a senha fornecida (req.body.password) com a senha armazenada no banco de dados
        const isValuePassword = await compare(password, user.password); // Verifica se as senhas coincidem
        
        // Se as senhas não coincidem, retorna uma mensagem de erro
        if (!isValuePassword) {
            return res.json({ error: "Senha inválida" }); // Retorna erro caso a senha seja inválida
        }

        // Se a senha for válida, gera um token JWT com base no ID do usuário
        const token = sign({ id: user.id }, "secret", { expiresIn: "1d" }); // Gera o token válido por 1 dia
        
        // Desestrutura o objeto user para obter apenas o id, email e nome
        const { id, name } = user;
        
        // Retorna os dados do usuário (id, email, name) e o token gerado para a requisição
        return res.json({ user: { id, email, name }, token });
    }
}
