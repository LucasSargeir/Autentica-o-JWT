import express from 'express';
import AuthController from './controlles/AuthController';
import ProjectController from './controlles/ProjectController';
import authMiddleware from './middlewares/auth';

const authController = new AuthController();
const projectController = new ProjectController();

const routes = express.Router();

routes.post('/auth/register', authController.register );
routes.post('/auth/authenticate', authController.authenticate );
routes.get('/projects', authMiddleware ,projectController.show );


export default routes;