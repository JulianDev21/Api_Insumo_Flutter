import Insumo from '../models/insumo.js'; // Ajusta la ruta si es necesario
import Counter from '../models/counter.js'; // Modelo para el contador
import Categoria from '../models/categoria.js'; // Modelo de Categoría, ajusta la ruta
import UndMedida from '../models/unidadMedida.js'; // Modelo de Unidad de Medida, ajusta la ruta

// Crear un nuevo insumo
export const postInsumo = async (req, res) => {
  try {
    const { nombre_insumo, cantidad, precio_unitario, id_und_medida, id_categoria } = req.body;

    // Validar campos requeridos
    if (!nombre_insumo || cantidad < 0 || precio_unitario < 0 || !id_und_medida || !id_categoria) {
      return res.status(400).json({ mensaje: 'Datos incompletos o inválidos' });
    }

    // Verificar si la categoría existe
    const categoria = await Categoria.findOne({ id_categoria });
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    // Verificar si la unidad de medida existe
    const undMedida = await UndMedida.findOne({ id_und_medida });
    if (!undMedida) {
      return res.status(404).json({ mensaje: 'Unidad de medida no encontrada' });
    }

    // Obtener el próximo ID de insumo usando el contador
    const counter = await Counter.findOneAndUpdate(
      { _id: 'insumo' }, // Usando 'insumo' como referencia
      { $inc: { seq: 1 } }, // Incrementa el contador
      { new: true, upsert: true } // Crea si no existe y devuelve el nuevo valor
    );

    if (!counter) {
      throw new Error('Counter not found');
    }

    const id_insumo = counter.seq;

    // Crear el insumo
    const nuevoInsumo = new Insumo({
      id_insumo,
      nombre_insumo,
      cantidad,
      precio_unitario,
      id_und_medida,
      id_categoria,
    });

    await nuevoInsumo.save();

    return res.status(201).json(nuevoInsumo);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al crear el insumo', error });
  }
};

// Obtener todos los insumos
export const getInsumos = async (req, res) => {
  try {
    const insumos = await Insumo.find();
    return res.status(200).json(insumos);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los insumos', error });
  }
};

// Obtener un insumo por ID
export const getInsumoById = async (req, res) => {
  try {
    const { id } = req.params;
    const insumo = await Insumo.findOne({ id_insumo: id });
    if (!insumo) {
      return res.status(404).json({ mensaje: 'Insumo no encontrado' });
    }
    return res.status(200).json(insumo);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener el insumo', error });
  }
};

// Actualizar un insumo
export const putInsumo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_insumo, cantidad, precio_unitario, id_und_medida, id_categoria } = req.body;

    const insumoActualizado = await Insumo.findOneAndUpdate(
      { id_insumo: id },
      { nombre_insumo, cantidad, precio_unitario, id_und_medida, id_categoria },
      { new: true }
    );

    if (!insumoActualizado) {
      return res.status(404).json({ mensaje: 'Insumo no encontrado' });
    }

    return res.status(200).json(insumoActualizado);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al actualizar el insumo', error });
  }
};

export const deleteInsumo = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el insumo antes de eliminarlo
    const insumo = await Insumo.findOne({ id_insumo: id });

    // Validar si el insumo existe
    if (!insumo) {
      return res.status(404).json({ mensaje: 'Insumo no encontrado' });
    }

    // Verificar si la cantidad es mayor a 0
    if (insumo.cantidad != 0) {
      return res.status(400).json({
        mensaje: 'No se puede eliminar el insumo porque su cantidad no es 0',
      });
    }

    // Eliminar el insumo
    const insumoEliminado = await Insumo.findOneAndDelete({ id_insumo: id });

    return res.status(200).json({
      mensaje: 'Insumo eliminado correctamente',
      insumo: insumoEliminado,
    });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar el insumo', error });
  }
};

