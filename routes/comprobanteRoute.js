import { Router } from 'express';
import { 
    postComprobante, 
    getComprobantes, 
    getComprobanteById, 
    putComprobante, 
    deleteComprobante 
} from '../controllers/comprobanteController.js';

const comprobanteRouter = Router();

// Ruta para obtener todos los comprobantes
comprobanteRouter.get('/', getComprobantes);

// Ruta para crear un nuevo comprobante
comprobanteRouter.post('/', postComprobante); // Requiere un JSON en el body con { "nombre_comprobante": "..." }

// Ruta para obtener un comprobante por su ID
comprobanteRouter.get('/:id', getComprobanteById); // Requiere el id_comprobante como parámetro en la URL

// Ruta para actualizar un comprobante por su ID
comprobanteRouter.put('/:id', putComprobante); // Requiere el id_comprobante como parámetro y un JSON en el body con { "nombre_comprobante": "..." }

// Ruta para eliminar un comprobante por su ID
comprobanteRouter.delete('/:id', deleteComprobante); // Requiere el id_comprobante como parámetro en la URL

export default comprobanteRouter;
