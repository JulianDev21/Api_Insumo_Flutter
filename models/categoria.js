
import mongoose, { Schema, model } from 'mongoose';

const categoriaSchema = new Schema(
  {
    id_categoria: {
      type: Number, 
      unique: true,
      required: true,
    },
    nombre_categoria: {
      type: String,
      required: true,
      unique: true, // Asegura que el nombre de la categoría sea único
    },
  },
  { timestamps: true, versionKey: false }
);

export default model('Categoria', categoriaSchema);
