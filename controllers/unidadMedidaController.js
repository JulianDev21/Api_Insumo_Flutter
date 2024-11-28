import UndMedida from '../models/unidadMedida.js'; // Ajusta la ruta según sea necesario
import Counter from '../models/counter.js'; // Ajusta la ruta según sea necesario
import Insumo from '../models/insumo.js'


// Crear una nueva unidad de medida
export const postUnidadMedida = async (req, res) => {
  try {
    const { und_medida } = req.body;

    // Verificar si ya existe una unidad de medida con el mismo nombre
    const unidadExistente = await UndMedida.findOne({ und_medida });
    if (unidadExistente) {
      return res.status(400).json({ mensaje: 'Ya existe una unidad de medida con ese nombre' });
    }

    // Encuentra y actualiza el contador de manera manual
    const counter = await Counter.findOneAndUpdate(
      { _id: 'undMedida' }, // Usando 'undMedida' como referencia
      { $inc: { seq: 1 } },   // Incrementa el contador
      { new: true, upsert: true } // Crea si no existe y devuelve el nuevo valor
    );

    if (!counter) {
      throw new Error('Counter not found');
    }

    // Asignar el valor de `seq` al campo `id_und_medida`
    const id_und_medida = counter.seq;

    // Crear la nueva unidad de medida
    const nuevaUnidadMedida = new UndMedida({ id_und_medida, und_medida });
    await nuevaUnidadMedida.save();

    return res.status(201).json(nuevaUnidadMedida);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al crear la unidad de medida', error });
  }
};

// Obtener todas las unidades de medida
export const getUnidadesMedida = async (req, res) => {
  try {
    const unidades = await UndMedida.find();
    return res.status(200).json(unidades);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las unidades de medida', error });
  }
};

// Obtener una unidad de medida por ID
export const getUnidadMedidaById = async (req, res) => {
  try {
    const { id } = req.params;
    const unidad = await UndMedida.findOne({ id_und_medida: id });
    if (!unidad) {
      return res.status(404).json({ mensaje: 'Unidad de medida no encontrada' });
    }
    return res.status(200).json(unidad);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener la unidad de medida', error });
  }
};

// Actualizar una unidad de medida
export const putUnidadMedida = async (req, res) => {
  try {
    const { id } = req.params;
    const { und_medida } = req.body;

    const unidadActualizada = await UndMedida.findOneAndUpdate(
      { id_und_medida: id },
      { und_medida },
      { new: true }
    );

    if (!unidadActualizada) {
      return res.status(404).json({ mensaje: 'Unidad de medida no encontrada' });
    }

    return res.status(200).json(unidadActualizada);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al actualizar la unidad de medida', error });
  }
};

// Eliminar una unidad de medida
export const deleteUnidadMedida = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si hay insumos asociados a la unidad de medida
    const insumosAsociados = await Insumo.find({ id_und_medida: id });

    if (insumosAsociados.length > 0) {
      // Si hay insumos asociados, no permitir la eliminación
      return res.status(400).json({
        mensaje: 'No se puede eliminar la unidad de medida porque está asociada a uno o más insumos',
      });
    }

    // Si no hay insumos asociados, proceder a eliminar la unidad de medida
    const unidadEliminada = await UndMedida.findOneAndDelete({ id_und_medida: id });

    if (!unidadEliminada) {
      return res.status(404).json({ mensaje: 'Unidad de medida no encontrada' });
    }

    return res.status(200).json({ mensaje: 'Unidad de medida eliminada exitosamente', unidad: unidadEliminada });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar la unidad de medida', error });
  }
};
