import mongoose, { Schema, model } from 'mongoose';

const undMedidaSchema = new Schema(
    {
      id_und_medida: {
        type: Number,
        unique: true,
        required: true,
      },
      und_medida: {
        type: String,
        required: true,
      },
    },
    { timestamps: true, versionKey: false }
  );
  
  export default model('UndMedida', undMedidaSchema);
  