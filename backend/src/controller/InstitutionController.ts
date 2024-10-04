import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class InstitutionController {
  async store(req: Request, res: Response) {
    const {
      nome,
      cnpj,
      endereco,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
      telefone,
      email,
      website,
      facebook,
      instagram,
      linkedin,
      descricao,
      areasAtuacao,
      publicoAlvo,
      projetos,
      nomeResponsavel,
      horarioFuncionamento
    } = req.body;
    const userId = Number(req.userId); // Converter userId para número

    try {
      const institution = await prisma.institution.create({
        data: {
          nome,
          cnpj,
          endereco,
          rua,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
          cep,
          telefone,
          email,
          website,
          facebook,
          instagram,
          linkedin,
          descricao,
          areasAtuacao,
          publicoAlvo,
          projetos,
          nomeResponsavel,
          horarioFuncionamento,
          userId,
          verified: false, // Instituição não verificada por padrão
        },
      });
      return res.status(201).json({ institution });
    } catch (error) {
      console.error("Erro ao criar instituição:", error);
      return res.status(500).json({ error: "Failed to create institution" });
    }
  }

  async index(req: Request, res: Response) {
    const userId = Number(req.userId); // Converter userId para número

    try {
      const institutions = await prisma.institution.findMany({
        where: { userId },
      });
      return res.json({ institutions });
    } catch (error) {
      console.error("Erro ao buscar instituições:", error);
      return res.status(500).json({ error: "Failed to fetch institutions" });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      // Busca todas as instituições verificadas
      const institutions = await prisma.institution.findMany({
        where: { verified: true }, // Somente instituições verificadas
      });
      return res.status(200).json({ institutions });
    } catch (error) {
      console.error("Erro ao buscar todas as instituições:", error);
      return res.status(500).json({ error: "Failed to fetch all institutions" });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const institution = await prisma.institution.findUnique({
        where: { id: Number(id) },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      if (!institution) {
        return res.status(404).json({ error: "Instituição não encontrada" });
      }

      return res.json(institution);
    } catch (error) {
      console.error("Erro ao buscar instituição:", error);
      return res.status(500).json({ error: "Erro ao buscar instituição" });
    }
  }

  async listPending(req: Request, res: Response) {
    try {
      const pendingInstitutions = await prisma.institution.findMany({
        where: { verified: false }, // Buscar instituições não verificadas
      });
      return res.status(200).json({ pendingInstitutions });
    } catch (error) {
      console.error("Erro ao buscar instituições pendentes:", error);
      return res.status(500).json({ error: "Failed to fetch pending institutions" });
    }
  }

  // Método para o admin verificar a instituição
  async verifyInstitution(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const institution = await prisma.institution.update({
        where: { id: Number(id) },
        data: { verified: true }, // Aprovar instituição
      });

      return res.json({ institution });
    } catch (error) {
      console.error("Erro ao verificar instituição:", error);
      return res.status(500).json({ error: "Failed to verify institution" });
    }
  }
  async rejectInstitution(req: Request, res: Response) {
    const { id } = req.params;
  
    try {
      const institution = await prisma.institution.update({
        where: { id: Number(id) },
        data: { verified: false }, // Rejeitar instituição
      });
  
      return res.json({ institution });
    } catch (error) {
      console.error("Erro ao rejeitar instituição:", error);
      return res.status(500).json({ error: "Failed to reject institution" });
    }
  }
}
