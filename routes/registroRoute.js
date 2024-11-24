import { Router } from 'express';
import {
  postUsuario,
  getUsuarios,
  getUsuarioById,
  putUsuario,
  deleteUsuario
} from '../controllers/registroController.js'; // Ajusta la ruta según corresponda

const registroRouter = Router();

// Ruta para registrar un nuevo usuario (POST)
registroRouter.post('/registro', postUsuario);

// Ruta para obtener todos los usuarios (GET)
registroRouter.get('/usuarios', getUsuarios);

// Ruta para obtener un usuario por ID (GET)
registroRouter.get('/usuarios/:id', getUsuarioById);

// Ruta para actualizar un usuario por ID (PUT)
registroRouter.put('/usuarios/:id', putUsuario);

// Ruta para eliminar un usuario por ID (DELETE)
registroRouter.delete('/usuarios/:id', deleteUsuario);

export default registroRouter;
