const mongoose = require('mongoose');
const CategoriasEnum = require('../Categorias');

const ProductSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true 
  },
  descripcion: { 
    type: String, 
    required: true 
  },
  categoria: { 
    type: String, 
    required: true,
    //enum: CategoriasEnum
  },
  precio: { 
    type: Number, 
    required: true 
  }
});

module.exports = mongoose.model('Producto', ProductSchema);
