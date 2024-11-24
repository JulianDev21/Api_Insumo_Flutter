import Movimiento from '../models/movimiento.js'; // Ajusta la ruta si es necesario
import Counter from '../models/counter.js'; // Modelo para el contador
import Insumo from '../models/insumo.js'; // Modelo de Insumo, ajusta la ruta según sea necesario

// Crear un nuevo movimiento
export const postMovimiento = async (req, res) => {
    try {
      const { cantidad, observaciones, id_comprobante, id_insumo } = req.body;
  
      // Validar cantidad no negativa
      if (cantidad < 0) {
        return res.status(400).json({ mensaje: 'La cantidad no puede ser negativa' });
      }
  
      // Verificar si el insumo existe
      const insumo = await Insumo.findOne({ id_insumo });
      if (!insumo) {
        return res.status(404).json({ mensaje: 'El insumo no existe' });
      }
  
      // Validar y actualizar la cantidad del insumo según el tipo de comprobante
      let nuevaCantidad;
      if (id_comprobante === 1) {
        // Entrada: sumar la cantidad
        nuevaCantidad = insumo.cantidad + cantidad;
      } else if (id_comprobante === 2) {
        // Salida: restar la cantidad
        if (insumo.cantidad < cantidad) {
          return res.status(400).json({ mensaje: 'La cantidad del insumo no puede quedar negativa' });
        }
        nuevaCantidad = insumo.cantidad - cantidad;
      } else if (id_comprobante === 3) {
        // Ajuste: asignar la cantidad directamente
        nuevaCantidad = cantidad;
      } else {
        return res.status(400).json({ mensaje: 'Tipo de comprobante inválido' });
      }
  
      // Actualizar la cantidad del insumo
      insumo.cantidad = nuevaCantidad;
      await insumo.save();
  
      // Obtener el próximo ID de movimiento usando el contador
      const counter = await Counter.findOneAndUpdate(
        { _id: 'movimiento' }, // Usando 'movimiento' como referencia
        { $inc: { seq: 1 } },   // Incrementa el contador
        { new: true, upsert: true } // Crea si no existe y devuelve el nuevo valor
      );
  
      if (!counter) {
        throw new Error('Counter not found');
      }
  
      const id_movimiento = counter.seq;
  
      // Crear el movimiento con la fecha actual
      const nuevoMovimiento = new Movimiento({
        id_movimiento,
        fecha: new Date(), // Establecer la fecha actual automáticamente
        cantidad,
        observaciones,
        id_comprobante,
        id_insumo,
      });
  
      await nuevoMovimiento.save();
  
      return res.status(201).json(nuevoMovimiento);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al crear el movimiento', error });
    }
  };
  

// Obtener todos los movimientos
export const getMovimientos = async (req, res) => {
  try {
    const movimientos = await Movimiento.find();
    return res.status(200).json(movimientos);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los movimientos', error });
  }
};

// Obtener un movimiento por ID
export const getMovimientoById = async (req, res) => {
  try {
    const { id } = req.params;
    const movimiento = await Movimiento.findOne({ id_movimiento: id });
    if (!movimiento) {
      return res.status(404).json({ mensaje: 'Movimiento no encontrado' });
    }
    return res.status(200).json(movimiento);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener el movimiento', error });
  }
};

// Actualizar un movimiento
export const putMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, cantidad, observaciones, id_comprobante, id_insumo } = req.body;

    const movimientoActualizado = await Movimiento.findOneAndUpdate(
      { id_movimiento: id },
      { fecha, cantidad, observaciones, id_comprobante, id_insumo },
      { new: true }
    );

    if (!movimientoActualizado) {
      return res.status(404).json({ mensaje: 'Movimiento no encontrado' });
    }

    return res.status(200).json(movimientoActualizado);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al actualizar el movimiento', error });
  }
};

// Eliminar un movimiento
export const deleteMovimiento = async (req, res) => {
  try {
    const { id } = req.params;

    const movimientoEliminado = await Movimiento.findOneAndDelete({ id_movimiento: id });

    if (!movimientoEliminado) {
      return res.status(404).json({ mensaje: 'Movimiento no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Movimiento eliminado', movimiento: movimientoEliminado });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar el movimiento', error });
  }
};
