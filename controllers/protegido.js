export const obtenerDatosProtegidos = (req, res) => {
    res.status(200).json({
      mensaje: 'Acceso concedido a ruta protegida',
      usuario: req.usuario, // Información del token
    });
  };
  