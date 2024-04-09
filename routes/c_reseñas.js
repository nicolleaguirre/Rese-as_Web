var express = require('express');
const ReseñasModel = require('../Modelos/Review');
const UserModel = require('../Modelos/User');
var router = express.Router();

const userID= '1';

const newUser = new UserModel({
    userID: userID,
    username: "Juan Perez",
    email: "jperez@gmail.com",
    password: "1234"
});

var review1 = new ReseñasModel({
    titulo: 'Excelente producto',
    contenido: 'Me encantó este producto. Muy recomendado.',
    rating: 5,
    product: '1',
    user: newUser._id, 
    createdAt: new Date()
});

var review2 = new ReseñasModel({
    titulo: 'Regular el producto',
    contenido: 'Esta regular. No lo recomiendo porque...',
    rating: 2,
    product: '1',
    user: newUser._id.user, 
    createdAt: new Date()
});

review1 = {
  titulo: review1.titulo,
  nombreUser: review1.user.username
}

var reviews = [review1, review2];

router.get('/', function(req, res) {
  res.send('Hola');
});


router.get('/resenas', async (req, res)=> {
    try {

        //const reviews = await ReseñasModel.find();

        if (reviews.length === 0) {
            res.json({ message: 'No se encontraron reseñas.' });
        }
        
        res.json({
          data: reviews,

        });

      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

module.exports = router;