import { Router } from 'express';
import {
    postMovimiento,
    getMovimientos,
    getMovimientoById,
    putMovimiento,
    deleteMovimiento
} from '../controllers/movimientoController.js';

const movimientoRouter = Router();

// Ruta para obtener todos los movimientos
movimientoRouter.get('/', getMovimientos);

// Ruta para crear un nuevo movimiento
movimientoRouter.post('/', postMovimiento); // Requiere un JSON en el body con los datos del movimiento

// Ruta para obtener un movimiento por su ID
movimientoRouter.get('/:id', getMovimientoById); // Requiere el id_movimiento como parámetro en la URL

// Ruta para actualizar un movimiento por su ID
movimientoRouter.put('/:id', putMovimiento); // Requiere el id_movimiento como parámetro y los datos a actualizar en el body

// Ruta para eliminar un movimiento por su ID
movimientoRouter.delete('/:id', deleteMovimiento); // Requiere el id_movimiento como parámetro en la URL

export default movimientoRouter;
