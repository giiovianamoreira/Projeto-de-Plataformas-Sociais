// Importação das dependências necessárias
import { Request, Response } from "express"; // Tipos para requisição e resposta do Express
import { prisma } from "../utils/prisma";     // Instância do Prisma para interagir com o banco de dados
import { upload } from "../../prisma/upload"; // Importação do middleware de upload (verifique se está corretamente configurado)
import axios from "axios";                   // Axios para fazer requisições HTTP, usado para acessar a API do Google Maps

// Definindo a chave da API do Google Maps
const GOOGLE_MAPS_API_KEY = 'AIzaSyBZZWqJfB-7tzPrZio3h7fNyazL5CeByY8';

export class InstitutionController {
  
  // Método para criar uma nova instituição
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

    const userId = Number(req.userId); // Obtém o ID do usuário a partir do token

    // Verifica se o userId é válido
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing or invalid" });
    }

    try {
      // Cria a instituição no banco de dados
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
          verified: false, // Instituição criada como não verificada inicialmente
        },
      });

      // Cria o endereço completo para consulta de coordenadas na API de Geocodificação do Google Maps
      const fullAddress = `${rua}, ${numero}, ${bairro}, ${cidade}, ${estado}, ${cep}`;
      const geoResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${GOOGLE_MAPS_API_KEY}`
      );

      let coordinates = null;
      if (geoResponse.data.status === 'OK') {
        coordinates = geoResponse.data.results[0].geometry.location; // Obtém a latitude e longitude
      }

      // Atualiza a instituição com as coordenadas obtidas
      await prisma.institution.update({
        where: { id: institution.id },
        data: {
          latitude: coordinates?.lat || null,
          longitude: coordinates?.lng || null,
        },
      });

      // Verifica se há arquivos de imagem para upload
      const files = req.files as Express.Multer.File[]; // Faz o cast para tipar corretamente
      if (files && files.length > 0) {
        const photoUrls = files.map((file) => `/uploads/institutions/${file.filename}`); // Mapeia as URLs das fotos

        // Cria as fotos no banco de dados associadas à instituição
        await prisma.foto.createMany({
          data: photoUrls.map((url) => ({
            url,
            institutionId: institution.id,
          })),
        });
      }

      // Retorna a instituição criada e as coordenadas obtidas
      return res.json({ institution, coordinates });
    } catch (error) {
      console.error("Erro ao criar instituição:", error);
      return res.status(500).json({ error: "Erro ao criar instituição" }); // Erro genérico
    }
  }

  // Método para listar as instituições associadas ao usuário
  async index(req: Request, res: Response) {
    const userId = Number(req.userId); // Certifica-se de que o userId é um número válido

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing or invalid" });
    }

    try {
      // Busca as instituições associadas ao userId
      const institutions = await prisma.institution.findMany({
        where: { userId },
      });
      return res.json({ institutions });
    } catch (error) {
      console.error("Erro ao buscar instituições:", error);
      return res.status(500).json({ error: "Failed to fetch institutions" }); // Retorna erro genérico
    }
  }

  // Método para listar todas as instituições verificadas
  async listAll(req: Request, res: Response) {
    try {
      // Busca todas as instituições verificadas
      const institutions = await prisma.institution.findMany({
        where: { verified: true }, // Filtra apenas instituições verificadas
      });
      return res.status(200).json({ institutions });
    } catch (error) {
      console.error("Erro ao buscar todas as instituições:", error);
      return res.status(500).json({ error: "Failed to fetch all institutions" }); // Erro genérico
    }
  }

  // Método para exibir detalhes de uma instituição específica
  async show(req: Request, res: Response) {
    const { id } = req.params; // Extrai o ID da instituição da URL

    try {
      // Busca a instituição no banco de dados, incluindo o usuário responsável e fotos associadas
      const institution = await prisma.institution.findUnique({
        where: { id: Number(id) },
        include: {
          user: { // Inclui informações sobre o usuário responsável
            select: {
              name: true,
              email: true,
            },
          },
          foto: true, // Inclui as fotos associadas à instituição
        },
      });

      if (!institution) {
        return res.status(404).json({ error: "Instituição não encontrada" });
      }

      // Ajusta a URL das fotos para a URL completa
      const institutionWithPhotoURLs = {
        ...institution,
        foto: institution.foto.map(foto => ({
          ...foto,
          url: `http://localhost:3333${foto.url}`, // Garante que a URL da foto é completa
        })),
      };

      return res.json(institutionWithPhotoURLs);
    } catch (error) {
      console.error("Erro ao buscar instituição:", error);
      return res.status(500).json({ error: "Erro ao buscar instituição" });
    }
  }

  // Método para listar as instituições pendentes (não verificadas)
  async listPending(req: Request, res: Response) {
    try {
      // Busca todas as instituições não verificadas
      const pendingInstitutions = await prisma.institution.findMany({
        where: { verified: false }, // Filtra as instituições que ainda não foram verificadas
      });
      return res.status(200).json({ pendingInstitutions });
    } catch (error) {
      console.error("Erro ao buscar instituições pendentes:", error);
      return res.status(500).json({ error: "Failed to fetch pending institutions" });
    }
  }

  // Método para o administrador verificar a instituição
  async verifyInstitution(req: Request, res: Response) {
    const { id } = req.params; // Extrai o ID da instituição da URL

    try {
      // Atualiza o status de verificação da instituição
      const institution = await prisma.institution.update({
        where: { id: Number(id) },
        data: { verified: true }, // Marca a instituição como verificada
      });

      return res.json({ institution });
    } catch (error) {
      console.error("Erro ao verificar instituição:", error);
      return res.status(500).json({ error: "Failed to verify institution" });
    }
  }

  // Método para o administrador rejeitar a instituição
  async rejectInstitution(req: Request, res: Response) {
    const { id } = req.params; // Extrai o ID da instituição da URL

    try {
      // Atualiza o status de verificação da instituição para "não verificada"
      const institution = await prisma.institution.update({
        where: { id: Number(id) },
        data: { verified: false }, // Marca a instituição como rejeitada
      });

      return res.json({ institution });
    } catch (error) {
      console.error("Erro ao rejeitar instituição:", error);
      return res.status(500).json({ error: "Failed to reject institution" });
    }
  }
}
