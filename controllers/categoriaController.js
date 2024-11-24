import Categoria from '../models/categoria.js'; // Ajusta la ruta según la ubicación de tu modelo
import Counter from '../models/counter.js'; // Asegúrate de importar el modelo Counter correctamente

// Crear una nueva categoría
export const postCategoria = async (req, res) => {
    try {
      const { nombre_categoria } = req.body;
  
      // Verificar si ya existe una categoría con el mismo nombre
      const categoriaExistente = await Categoria.findOne({ nombre_categoria });
      if (categoriaExistente) {
        return res.status(400).json({ mensaje: 'Ya existe una categoría con ese nombre' });
      }
  
      // Encuentra y actualiza el contador de manera manual
      const counter = await Counter.findOneAndUpdate(
        { _id: 'categoria' }, // Usando 'categoria' como referencia 
        { $inc: { seq: 1 } },   // Incrementa el contador
        { new: true, upsert: true } // Crea si no existe y devuelve el nuevo valor
      );
  
      if (!counter) {
        throw new Error('Counter not found');
      }
  
      // Asignar el valor de `seq` al campo `id_categoria` 
      const id_categoria = counter.seq;
  
      // Crear la nueva categoría con el id_categoria generado
      const nuevaCategoria = new Categoria({ id_categoria, nombre_categoria });
      await nuevaCategoria.save();
  
      return res.status(201).json(nuevaCategoria);
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al crear la categoría', error });
    }
  };

// Obtener todas las categorías
export const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las categorías', error });
  }
};

// Obtener una categoría por su ID
export const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findOne({ id_categoria: id });

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    return res.status(200).json(categoria);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener la categoría', error });
  }
};

// Actualizar una categoría
export const putCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_categoria } = req.body;

    const categoriaActualizada = await Categoria.findOneAndUpdate(
      { id_categoria: id },
      { nombre_categoria },
      { new: true } // Devuelve el documento actualizado
    );

    if (!categoriaActualizada) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    return res.status(200).json(categoriaActualizada);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al actualizar la categoría', error });
  }
};

// Eliminar una categoría
export const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoriaEliminada = await Categoria.findOneAndDelete({ id_categoria: id });

    if (!categoriaEliminada) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    return res.status(200).json({ mensaje: 'Categoría eliminada con éxito' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar la categoría', error });
  }
};
