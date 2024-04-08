const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema({

  titulo: {
    type: String,
    required: true
  },
  contenido: { 
    type: String, required: true 
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  reseña: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: true
  }
});

module.exports = mongoose.model('Comentario', ComentarioSchema);
