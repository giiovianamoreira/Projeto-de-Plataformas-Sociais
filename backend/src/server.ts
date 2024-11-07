import express from 'express';
import { router } from './routes';
import cors from "cors";
import path from 'path';  // Adicionando o path

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// Servir arquivos estáticos da pasta uploads/institutions
app.use('/uploads/institutions', express.static(path.join(__dirname, '../uploads/institutions')));

// Servir arquivos estáticos da pasta uploads/users para fotos de perfil
app.use('/uploads/users', express.static(path.join(__dirname, '../uploads/users')));

app.listen(3333, () => 
    console.log("servidor está rodando on http://localhost:3333")
);
