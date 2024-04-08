var express = require('express');
const ReseñasModel = require('../Modelos/Review');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('Hola');
});

router.get('/resenas', async (req, res)=> {
    try {
        const review1 = new ReseñasModel({
            titulo: 'Excelente producto',
            contenido: 'Me encantó este producto. Muy recomendado.',
            rating: 5,
            product: '1',
            user: '1', 
            createdAt: new Date()
        });
          const review2 = new ReseñasModel({
            titulo: 'Bueno pero podría mejorar',
            contenido: 'El producto es decente, pero hay algunos aspectos que podrían mejorar.',
            rating: 3,
            product: '1',
            user: '1',
            createdAt: new Date()
        });
        const nuevosReviews = await Promise.all([review1.save(), review2.save()]);

        //const reviews = await Review.find();
        res.json(nuevosReviews);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

module.exports = router;