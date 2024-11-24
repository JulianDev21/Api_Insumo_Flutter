import { Router } from 'express';
import { 
    postInsumo, 
    getInsumos, 
    getInsumoById, 
    putInsumo, 
    deleteInsumo 
} from '../controllers/insumoController.js';

const insumoRouter = Router();

// Ruta para obtener todos los insumos
insumoRouter.get('/', getInsumos);

// Ruta para crear un nuevo insumo
insumoRouter.post('/', postInsumo); // Requiere un JSON en el body con { "nombre_insumo", "cantidad", "precio_unitario", "id_und_medida", "id_categoria" }

// Ruta para obtener un insumo por su ID
insumoRouter.get('/:id', getInsumoById); // Requiere el id_insumo como parámetro en la URL

// Ruta para actualizar un insumo por su ID
insumoRouter.put('/:id', putInsumo); // Requiere el id_insumo como parámetro y un JSON en el body con los campos a actualizar

// Ruta para eliminar un insumo por su ID
insumoRouter.delete('/:id', deleteInsumo); // Requiere el id_insumo como parámetro en la URL

export default insumoRouter;
