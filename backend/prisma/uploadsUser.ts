import multer from 'multer';
import path from 'path';

// Configura o storage para o multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/users'); // Diretório onde as fotos serão armazenadas
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Nome do arquivo, pode ser alterado se necessário
    }
});

// Cria o middleware
export const uploadUser = multer({ storage: storage });
