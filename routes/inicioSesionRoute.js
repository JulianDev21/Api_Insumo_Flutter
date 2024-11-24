import { Router } from 'express';
import { iniciarSesion } from '../controllers/inicioSesionController.js'; // Ajusta la ruta según corresponda

const inicioSesionRouter = Router();

// Ruta para iniciar sesión
inicioSesionRouter.post('/iniciar-sesion', iniciarSesion); // Requiere un JSON en el body con { "correo_electronico": "...", "contrasena": "..." }

export default inicioSesionRouter;
