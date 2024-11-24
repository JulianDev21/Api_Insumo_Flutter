import mongoose, { Schema, model } from 'mongoose';

const comprobanteSchema = new Schema(
    {
      id_comprobante: {
        type: Number,
        unique: true,
        required: true,
      },
      nombre_comprobante: {
        type: String,
        required: true,
      },
    },
    { timestamps: true, versionKey: false }
  );
  
  export default model('Comprobante', comprobanteSchema);
  