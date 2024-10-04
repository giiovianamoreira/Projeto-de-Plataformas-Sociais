import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEvent = async (req: Request, res: Response) => {
  const { local, data, hora, categoria, descricao, finalidade } = req.body;
  const institutionId = req.body.institutionId; // O ID da instituição deve vir do body

  try {
    // Verifica se o institutionId foi passado
    if (!institutionId) {
      return res.status(400).json({ error: 'InstitutionId é obrigatório.' });
    }

    // Criação do evento
    const event = await prisma.event.create({
      data: {
        local,
        data: new Date(data), // Certificando-se de que a data é do tipo Date
        hora,
        categoria,
        descricao,
        finalidade,
        institutionId: Number(institutionId), // Certificando-se que é um número
      },
    });

    return res.status(201).json(event);
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    return res.status(500).json({ error: 'Erro ao criar evento.' });
  }
};

export const addHeart = async (req: Request, res: Response) => {
  const { eventId } = req.params;

  try {
    const event = await prisma.event.update({
      where: { id: Number(eventId) },
      data: { hearts: { increment: 1 } }, // Incrementa o contador de "corações"
    });
    return res.status(200).json(event);
  } catch (error) {
    console.error('Erro ao adicionar coração:', error);
    return res.status(500).json({ error: 'Erro ao adicionar coração.' });
  }
};
export const List = async (req: Request, res: Response) =>{
    const { institutionId } = req.params;

    try {
      const events = await prisma.event.findMany({
        where: { institutionId: Number(institutionId) },
      });
      return res.status(200).json(events);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      return res.status(500).json({ error: 'Erro ao buscar eventos.' });
    }
}