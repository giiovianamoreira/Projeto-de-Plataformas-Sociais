// Importa os tipos Request e Response do Express para tipar as requisições e respostas
import { Request, Response } from 'express';
// Importa o PrismaClient para interagir com o banco de dados
import { PrismaClient } from '@prisma/client';

// Instância do PrismaClient para acessar o banco de dados
const prisma = new PrismaClient();

// Função para criar um evento
export const createEvent = async (req: Request, res: Response) => {
  // Extrai os dados do corpo da requisição
  const { local, data, hora, categoria, descricao, finalidade } = req.body;
  // Extrai o ID da instituição do corpo da requisição
  const institutionId = req.body.institutionId; // O ID da instituição deve vir do body

  try {
    // Verifica se o institutionId foi passado, se não, retorna erro
    if (!institutionId) {
      return res.status(400).json({ error: 'InstitutionId é obrigatório.' });
    }

    // Criação do evento no banco de dados
    const event = await prisma.event.create({
      data: {
        local,                         // Local do evento
        data: new Date(data),          // A data é convertida para o tipo Date
        hora,                          // Hora do evento
        categoria,                     // Categoria do evento
        descricao,                     // Descrição do evento
        finalidade,                    // Finalidade do evento
        institutionId: Number(institutionId), // Converte o institutionId para número
      },
    });

    // Retorna o evento criado com status 201
    return res.status(201).json(event);
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    // Em caso de erro, retorna status 500 e mensagem de erro
    return res.status(500).json({ error: 'Erro ao criar evento.' });
  }
};

// Função para adicionar um "coração" ao evento
export const addHeart = async (req: Request, res: Response) => {
  // Extrai o ID do evento dos parâmetros da requisição
  const { eventId } = req.params;

  try {
    // Atualiza o evento, incrementando o número de "corações"
    const event = await prisma.event.update({
      where: { id: Number(eventId) },  // Busca o evento pelo ID
      data: { hearts: { increment: 1 } }, // Incrementa o contador de "corações"
    });
    // Retorna o evento atualizado com status 200
    return res.status(200).json(event);
  } catch (error) {
    console.error('Erro ao adicionar coração:', error);
    // Em caso de erro, retorna status 500 e mensagem de erro
    return res.status(500).json({ error: 'Erro ao adicionar coração.' });
  }
};

// Função para listar os eventos de uma instituição específica
export const List = async (req: Request, res: Response) => {
  // Extrai o ID da instituição dos parâmetros da requisição
  const { institutionId } = req.params;

  try {
    // Busca todos os eventos da instituição no banco de dados
    const events = await prisma.event.findMany({
      where: { institutionId: Number(institutionId) }, // Filtra os eventos pela instituição
    });
    // Retorna os eventos encontrados com status 200
    return res.status(200).json(events);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    // Em caso de erro, retorna status 500 e mensagem de erro
    return res.status(500).json({ error: 'Erro ao buscar eventos.' });
  }
}
