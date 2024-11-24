import mongoose, { Schema, model } from 'mongoose';

const usuarioSchema = new Schema(
  {
    nombre_usuario: {
      type: String,
      required: true,
      unique: true, // Cada nombre de usuario debe ser único
    },
    correo_electronico: {
      type: String,
      required: true,
      unique: true, // Cada correo electrónico debe ser único
      match: [/.+\@.+\..+/, 'Por favor, ingresa un correo válido'], // Validación básica de email
    },
    contrasena: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Añade `createdAt` y `updatedAt`
    versionKey: false, // Elimina el campo `__v`
  }
);

export default model('Usuario', usuarioSchema);
