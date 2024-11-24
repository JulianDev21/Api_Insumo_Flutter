import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verificar si el token está presente
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token no proporcionado o inválido' });
  }

  const token = authHeader.split(' ')[1]; // Extraer el token del encabezado

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto'); // Verificar el token
    req.usuario = decoded; // Adjuntar la información del token al request
    next(); // Continuar a la siguiente función de la ruta
  } catch (error) {
    res.status(403).json({ mensaje: 'Token inválido o expirado', detalles: error.message });
  }
};
