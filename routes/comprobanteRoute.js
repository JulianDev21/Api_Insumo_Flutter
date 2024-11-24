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
comprobanteRouter.get('/comprobantes/', getComprobantes);

// Ruta para crear un nuevo comprobante
comprobanteRouter.post('/comprobantes/', postComprobante); // Requiere un JSON en el body con { "nombre_comprobante": "..." }

// Ruta para obtener un comprobante por su ID
comprobanteRouter.get('/comprobantes/:id', getComprobanteById); // Requiere el id_comprobante como parámetro en la URL

// Ruta para actualizar un comprobante por su ID
comprobanteRouter.put('/comprobantes/:id', putComprobante); // Requiere el id_comprobante como parámetro y un JSON en el body con { "nombre_comprobante": "..." }

// Ruta para eliminar un comprobante por su ID
comprobanteRouter.delete('/comprobantes/:id', deleteComprobante); // Requiere el id_comprobante como parámetro en la URL

export default comprobanteRouter;
