import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { upload } from "../../prisma/upload"; // Certifique-se de que isso está corretamente configurado
import axios from "axios";

const GOOGLE_MAPS_API_KEY = 'AIzaSyBZZWqJfB-7tzPrZio3h7fNyazL5CeByY8';

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
      horarioFuncionamento,
    } = req.body;

    const userId = Number(req.userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing or invalid" });
    }

    try {
      // Cria a instituição
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
          verified: false,
        },
      });

      // Faz a solicitação à API de Geocodificação do Google para converter o endereço em coordenadas
      const fullAddress = `${rua}, ${numero}, ${bairro}, ${cidade}, ${estado}, ${cep}`;
      const geoResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${GOOGLE_MAPS_API_KEY}`
      );

      let coordinates = null;
      if (geoResponse.data.status === 'OK') {
        coordinates = geoResponse.data.results[0].geometry.location; // Pega latitude e longitude
      }

      // Atualiza a instituição com as coordenadas
      await prisma.institution.update({
        where: { id: institution.id },
        data: {
          latitude: coordinates?.lat || null,
          longitude: coordinates?.lng || null,
        },
      });

      // Verifica se há arquivos de imagem para upload
      const files = req.files as Express.Multer.File[];
      if (files && files.length > 0) {
        const photoUrls = files.map((file) => `/uploads/institutions/${file.filename}`);

        // Cria as fotos no banco de dados associadas à instituição
        await prisma.foto.createMany({
          data: photoUrls.map((url) => ({
            url,
            institutionId: institution.id,
          })),
        });
      }

      return res.json({ institution, coordinates });
    } catch (error) {
      console.error("Erro ao criar instituição:", error);
      return res.status(500).json({ error: "Erro ao criar instituição" });
    }
  }

  async index(req: Request, res: Response) {
    const userId = Number(req.userId); // Certifica-se que o userId é um número válido

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing or invalid" });
    } 
               
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
          foto: true, // Incluir fotos da instituição
        },
      });

      if (!institution) {
        return res.status(404).json({ error: "Instituição não encontrada" });
      }

      // Construir URLs completas das fotos
      const institutionWithPhotoURLs = {
        ...institution,
        foto: institution.foto.map(foto => ({
          ...foto,
          url: `http://localhost:3333${foto.url}` // Ajuste para a URL correta
        })),
      };

      return res.json(institutionWithPhotoURLs);
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
