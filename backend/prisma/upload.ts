// Importa o módulo multer para lidar com upload de arquivos
import multer from 'multer';
// Importa o módulo path para manipulação de caminhos de arquivos
import path from 'path';
// Importa o tipo Request do Express para tipar os parâmetros da função de destino
import { Request } from 'express';

// Configuração de armazenamento para os arquivos enviados
const storage = multer.diskStorage({
  // Função para definir o destino do arquivo enviado
  destination: (req: Request, file: Express.Multer.File, cb) => {
    // Define o caminho onde os arquivos serão armazenados
    const uploadPath = path.join(__dirname, '../uploads/institutions');
    // Chama o callback passando o destino onde os arquivos serão armazenados
    cb(null, uploadPath);  
  },
  
  // Função para definir o nome do arquivo enviado
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Gera um sufixo único para o arquivo com base no timestamp e um número aleatório
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Chama o callback passando o nome final do arquivo, com a extensão original do arquivo
    cb(null, uniqueSuffix + path.extname(file.originalname));  
  }
});

// Cria o middleware de upload com a configuração de storage definida acima
export const upload = multer({ storage });
