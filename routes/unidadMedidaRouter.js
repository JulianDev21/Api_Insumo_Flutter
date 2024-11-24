import { Router } from 'express';
import {
  postUnidadMedida,
  getUnidadesMedida,
  getUnidadMedidaById,
  putUnidadMedida,
  deleteUnidadMedida
} from '../controllers/unidadMedidaController.js';

const unidadMedidaRouter = Router();

// Ruta para obtener todas las unidades de medida
unidadMedidaRouter.get('/unidadesMedida/', getUnidadesMedida);

// Ruta para crear una nueva unidad de medida
unidadMedidaRouter.post('/unidadesMedida/', postUnidadMedida); // Requiere un JSON con el campo `und_medida` en el body

// Ruta para obtener una unidad de medida por su ID
unidadMedidaRouter.get('/unidadesMedida/:id', getUnidadMedidaById); // Requiere el id_und_medida como parámetro en la URL

// Ruta para actualizar una unidad de medida por su ID
unidadMedidaRouter.put('/unidadesMedida/:id', putUnidadMedida); // Requiere el id_und_medida como parámetro y los datos a actualizar en el body

// Ruta para eliminar una unidad de medida por su ID
unidadMedidaRouter.delete('/unidadesMedida/:id', deleteUnidadMedida); // Requiere el id_und_medida como parámetro en la URL

export default unidadMedidaRouter;
