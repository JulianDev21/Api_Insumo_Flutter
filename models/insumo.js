import mongoose, { Schema, model } from 'mongoose';

// Define el esquema para Insumos
const insumoSchema = new Schema(
    {
      id_insumo: {
        type: Number,
        unique: true,
        required: true,
      },
      nombre_insumo: {
        type: String,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
        default: 0, // Cantidad inicial por defecto 0
      },
      precio_unitario: {
        type: Number,
        required: true,
      },
      id_und_medida: {
        type: Number, // Referencia al campo `id_und_medida` del modelo UndMedida
        required: true,
      },
      id_categoria: {
        type: Number, // Referencia al campo `id_categoria` del modelo Categoria
        required: true,
      },
    },
    { timestamps: true, versionKey: false }
  );
  
  export default model('Insumo', insumoSchema);
  