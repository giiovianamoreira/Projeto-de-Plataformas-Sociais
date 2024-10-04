// src/routes.ts

import { Router } from 'express';

import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { AuthMiddlewares } from './middleware/auth';
import { InstitutionController } from './controller/InstitutionController';
import { AdminMiddlewares } from './middleware/adminAuth'; 
import { createEvent , addHeart , List} from './controller/EventController';
// import { MessageController } from './controller/MessageController';

const usercontroller = new UserController();
const authcontroller = new AuthController();
const institutionController = new InstitutionController();
// const messageController = new MessageController();

export const router = Router();

// Rotas de usuário
router.post("/create", usercontroller.store);
router.get("/users", usercontroller.index);
router.get('/users/:id', usercontroller.show);
router.delete("/delete", AuthMiddlewares, usercontroller.deleteAccount);
router.patch("/update", AuthMiddlewares, usercontroller.update);

// Rotas de autenticação
router.post("/auth", authcontroller.authenticate);

// Rotas de instituição
router.post("/institution", AuthMiddlewares, institutionController.store);
router.get("/institutions", AuthMiddlewares, institutionController.index);
router.get("/institution/listall", institutionController.listAll);
router.get("/institution/:id", institutionController.show);

// Rotas para verificação de instituições (Admin)
router.get("/institutions/pending", AuthMiddlewares, AdminMiddlewares, institutionController.listPending); // Apenas admin
router.patch("/institution/verify/:id", AuthMiddlewares, AdminMiddlewares, institutionController.verifyInstitution); // Apenas admin
router.patch("/institution/reject/:id", AuthMiddlewares, AdminMiddlewares, institutionController.rejectInstitution); // Apenas admin

//criar eventos 

router.post('/events', createEvent);
router.get('/institutions/:institutionId/events', List);

// Rota para adicionar um coração ao evento
router.post('/events/:eventId/hearts', AuthMiddlewares, addHeart);




//rota de mensagens 

// router.post("/messages", AuthMiddlewares, messageController.createMessage);

// // Rota para buscar mensagens por instituição
// router.get("/messages/institution/:institutionId", messageController.getMessagesByInstitution);



// // Rota para buscar mensagens por usuário (caso precise listar as mensagens do usuário logado)
// router.get("/messages/user", AuthMiddlewares, messageController.getMessagesByUser);