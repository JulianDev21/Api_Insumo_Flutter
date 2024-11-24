import bcrypt from 'bcryptjs'; // Usar bcryptjs para encriptar contraseñas
import Usuario from '../models/usuario.js';

// Crear un nuevo usuario (POST)
export const postUsuario = async (req, res) => {
  const { nombre_usuario, correo_electronico, contrasena } = req.body;

  try {
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

    // Crear un nuevo usuario
    const usuario = new Usuario({
      nombre_usuario,
      correo_electronico,
      contrasena: contrasenaEncriptada, // Asignar la contraseña encriptada
    });

    // Guardar el usuario en la base de datos
    await usuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario', detalles: error.message });
  }
};

// Obtener todos los usuarios (GET)
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios', detalles: error.message });
  }
};

// Obtener un usuario por ID (GET)
export const getUsuarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findById(id);
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario', detalles: error.message });
  }
};

// Actualizar un usuario por ID (PUT)
export const putUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre_usuario, correo_electronico, contrasena } = req.body;

  try {
    // Buscar al usuario
    const usuario = await Usuario.findById(id);
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Si se proporciona una nueva contraseña, encriptarla
    let contrasenaEncriptada;
    if (contrasena) {
      const salt = await bcrypt.genSalt(10);
      contrasenaEncriptada = await bcrypt.hash(contrasena, salt);
    }

    // Actualizar los campos del usuario
    usuario.nombre_usuario = nombre_usuario || usuario.nombre_usuario;
    usuario.correo_electronico = correo_electronico || usuario.correo_electronico;
    if (contrasenaEncriptada) {
      usuario.contrasena = contrasenaEncriptada;
    }

    // Guardar los cambios
    await usuario.save();

    res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario', detalles: error.message });
  }
};

// Eliminar un usuario por ID (DELETE)
export const deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario', detalles: error.message });
  }
};
