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
categoriaRouter.get('/', getCategorias);

// Ruta para crear una nueva categoría
categoriaRouter.post('/', postCategoria); // Requiere un JSON en el body con { "nombre_categoria": "..." }

// Ruta para obtener una categoría por su ID
categoriaRouter.get('/:id', getCategoriaById); // Requiere el id_categoria como parámetro en la URL

// Ruta para actualizar una categoría por su ID
categoriaRouter.put('/:id', putCategoria); // Requiere el id_categoria como parámetro y un JSON en el body con { "nombre_categoria": "..." }

// Ruta para eliminar una categoría por su ID
categoriaRouter.delete('/:id', deleteCategoria); // Requiere el id_categoria como parámetro en la URL

export default categoriaRouter;
