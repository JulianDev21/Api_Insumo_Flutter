import bcrypt from 'bcryptjs'; // Usar bcryptjs para encriptar contraseñas
import jwt from 'jsonwebtoken'; // Usar JWT para autenticación
import Usuario from '../models/usuario.js';

export const iniciarSesion = async (req, res) => {
  const { correo_electronico, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo_electronico });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña encriptada con la ingresada
    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear un token JWT sin el rol
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET || 'secreto', // Reemplaza con una variable de entorno
      { expiresIn: '1h' } // Tiempo de expiración del token
    );

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión', detalles: error.message });
  }
};
