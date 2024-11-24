import mongoose, { Schema, model } from 'mongoose';


const movimientoSchema = new Schema(
    {
      id_movimiento: {
        type: Number,
        unique: true,
        required: true,
      },
      fecha: {
        type: Date,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
      observaciones: {
        type: String,
      },
      id_comprobante: {
        type: Number, // Referencia al campo `id_comprobante` del modelo Comprobante
        required: true,
      },
      id_insumo: {
        type: Number, // Referencia al campo `id_insumo` del modelo Insumo
        required: true,
      },
    },
    { timestamps: true, versionKey: false }
  );
  
  export default model('Movimiento', movimientoSchema);
  