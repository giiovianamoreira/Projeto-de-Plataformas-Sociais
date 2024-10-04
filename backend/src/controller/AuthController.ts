import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";


export class AuthController {

    async authenticate (req: Request, res: Response) 
    {
        // pega os dados do body
        const { email, password } =req.body
        // aqui ele pesquisa o email
        const user = await prisma.user.findUnique
        (
            { where: { email } } 
        );
        // valida a existência do email
        if (!user)
        {
            return res.json({ error: "User not found" })
        }
        // compara a senha do body, com a do usuário que foi cadastrado
        const isValuePassword = await compare(password , user.password);
        // verifica a existência da senha
        if(!isValuePassword)
        {
            return res.json({ error: "senha inválida"})
        }

        const token = sign({id: user.id},"secret", {expiresIn: "1d"})

        const  { id, name } = user;
 
        return res.json({user: {id, email, name}, token})
    }
}