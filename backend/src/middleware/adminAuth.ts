import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prisma";

// Middleware para verificar se o usuário é administrador
export const AdminMiddlewares = async (req: Request, res: Response, next: NextFunction) => {
  const userId = Number(req.userId); // Certifique-se de que o userId foi atribuído no middleware de autenticação

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ error: "Acesso negado: somente administradores podem acessar essa rota" });
    }

    // Se for admin, continua
    next();
  } catch (error) {
    console.error("Erro na verificação de admin:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
