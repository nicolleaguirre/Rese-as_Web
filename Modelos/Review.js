const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  titulo: { 
    type: String, required: true 
  },
  contenido: { 
    type: String, required: true 
  },
  rating: { 
    type: Number, required: true, min: 1, max: 5 },
  product: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
  },
  createdAt: { 
    type: Date, default: Date.now 
  }
});

module.exports = mongoose.model('Review', ReviewSchema);