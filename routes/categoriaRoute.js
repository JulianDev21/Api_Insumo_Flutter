import { Router } from 'express';
import { 
    getCategorias, 
    getCategoriaById, 
    postCategoria, 
    putCategoria, 
    deleteCategoria 
} from '../controllers/categoriaController.js';

const categoriaRouter = Router();

// Ruta para obtener todas las categorías
categoriaRouter.get('/categorias/', getCategorias);

// Ruta para crear una nueva categoría
categoriaRouter.post('/categorias/', postCategoria); // Requiere un JSON en el body con { "nombre_categoria": "..." }

// Ruta para obtener una categoría por su ID
categoriaRouter.get('/categorias/:id', getCategoriaById); // Requiere el id_categoria como parámetro en la URL

// Ruta para actualizar una categoría por su ID
categoriaRouter.put('/categorias/:id', putCategoria); // Requiere el id_categoria como parámetro y un JSON en el body con { "nombre_categoria": "..." }

// Ruta para eliminar una categoría por su ID
categoriaRouter.delete('/categorias/:id', deleteCategoria); // Requiere el id_categoria como parámetro en la URL

export default categoriaRouter;
