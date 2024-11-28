// Importa o módulo multer para lidar com upload de arquivos
import multer from 'multer';
// Importa o módulo path para manipulação de caminhos de arquivos (não utilizado nesse código, mas pode ser útil em futuras modificações)
import path from 'path';

// Configura o storage para o multer
const storage = multer.diskStorage({
    // Função que define o diretório de destino onde os arquivos serão armazenados
    destination: (req, file, cb) => {
        // Define o diretório 'uploads/users' como o local para salvar os arquivos
        cb(null, 'uploads/users'); // Diretório onde as fotos serão armazenadas
    },
    // Função que define o nome do arquivo salvo
    filename: (req, file, cb) => {
        // O nome do arquivo será o nome original do arquivo enviado
        cb(null, file.originalname); // Nome do arquivo, pode ser alterado se necessário
    }
});

// Cria o middleware para o upload de arquivos, usando a configuração de storage definida acima
export const uploadUser = multer({ storage: storage });
