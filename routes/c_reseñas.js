var express = require('express');
const ReseñasModel = require('../Modelos/Review');
const UserModel = require('../Modelos/User');
const ProductoModel = require('../Modelos/Producto');
var router = express.Router();

const userID= '1';

const newUser = new UserModel({
    userID: userID,
    username: "Juan Perez",
    email: "jperez@gmail.com",
    password: "1234"
});

const pelicula = new ProductoModel({
  nombre: "The Godfather",
  descripcion: "Director: Francis Fod Coppola",
  categoria: "Pelicula",
  precio: 0
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
    user: newUser._id, 
    nombreuser: newUser.username,
    createdAt: new Date()
});


var reviews = [review1, review2];

router.get('/', function(req, res) {
  res.send('Hola');
});

router.get('/resenas', async (req, res)=> {
    try {

        //const reviews = await ReseñasModel.find();
        reviews = añadirNombres();
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

function añadirNombres(){
  review1 = {
    titulo: review1.titulo,
    contenido: review1.contenido,
    rating: review1.rating,
    product: pelicula.nombre,
    categoria: pelicula.categoria,
    user: newUser.username, 
    createdAt: new Date(2024, 3, 8)
  };

  review2 = {
    titulo: review2.titulo,
    contenido: review2.contenido,
    rating: review2.rating,
    product: pelicula.nombre,
    categoria: pelicula.categoria,
    user: newUser.username, 
    createdAt: new Date(2024, 3, 8)
  };
  return [review1, review2];

}

module.exports = router;