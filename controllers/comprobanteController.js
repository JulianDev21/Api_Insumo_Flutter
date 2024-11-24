import Comprobante from '../models/comprobante.js'; // Ajusta la ruta según sea necesario
import Counter from '../models/counter.js'; // Ajusta la ruta según sea necesario

// Crear un nuevo comprobante
export const postComprobante = async (req, res) => {
  try {
    const { nombre_comprobante } = req.body;

    // Verificar si ya existe un comprobante con el mismo nombre
    const comprobanteExistente = await Comprobante.findOne({ nombre_comprobante });
    if (comprobanteExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un comprobante con ese nombre' });
    }

    // Encuentra y actualiza el contador de manera manual
    const counter = await Counter.findOneAndUpdate(
      { _id: 'comprobante' }, // Usando 'comprobante' como referencia
      { $inc: { seq: 1 } },   // Incrementa el contador
      { new: true, upsert: true } // Crea si no existe y devuelve el nuevo valor
    );

    if (!counter) {
      throw new Error('Counter not found');
    }

    // Asignar el valor de `seq` al campo `id_comprobante`
    const id_comprobante = counter.seq;

    // Crear el nuevo comprobante
    const nuevoComprobante = new Comprobante({ id_comprobante, nombre_comprobante });
    await nuevoComprobante.save();

    return res.status(201).json(nuevoComprobante);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al crear el comprobante', error });
  }
};

// Obtener todos los comprobantes
export const getComprobantes = async (req, res) => {
  try {
    const comprobantes = await Comprobante.find();
    return res.status(200).json(comprobantes);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los comprobantes', error });
  }
};

// Obtener un comprobante por ID
export const getComprobanteById = async (req, res) => {
  try {
    const { id } = req.params;
    const comprobante = await Comprobante.findOne({ id_comprobante: id });
    if (!comprobante) {
      return res.status(404).json({ mensaje: 'Comprobante no encontrado' });
    }
    return res.status(200).json(comprobante);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener el comprobante', error });
  }
};

// Actualizar un comprobante
export const putComprobante = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_comprobante } = req.body;

    const comprobanteActualizado = await Comprobante.findOneAndUpdate(
      { id_comprobante: id },
      { nombre_comprobante },
      { new: true }
    );

    if (!comprobanteActualizado) {
      return res.status(404).json({ mensaje: 'Comprobante no encontrado' });
    }

    return res.status(200).json(comprobanteActualizado);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al actualizar el comprobante', error });
  }
};

// Eliminar un comprobante
export const deleteComprobante = async (req, res) => {
  try {
    const { id } = req.params;

    const comprobanteEliminado = await Comprobante.findOneAndDelete({ id_comprobante: id });

    if (!comprobanteEliminado) {
      return res.status(404).json({ mensaje: 'Comprobante no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Comprobante eliminado', comprobante: comprobanteEliminado });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar el comprobante', error });
  }
};
