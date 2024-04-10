var express = require('express');
const ReseñasModel = require('../Modelos/Review');
const UserModel = require('../Modelos/User');
const ProductoModel = require('../Modelos/Producto');
const moment = require('moment');

var router = express.Router();

const newUser = new UserModel({
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

const cocaCola = new ProductoModel({
  nombre: "Cocacola 350 ml",
  descripcion: "",
  categoria: "Producto",
  precio: 3000
});

var review1 = new ReseñasModel({
    titulo: 'Excelente película, una obra maestra',
    contenido: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis unde tempora consectetur, quia consequuntur repellendus doloremque amet! Quidem illum et aspernatur maiores porro unde sunt repellendus veritatis, fuga aut cupiditate?',
    rating: 5,
    product: pelicula._id,
    user: newUser._id, 
    createdAt: new Date(2024, 3, 8)
});

var review2 = new ReseñasModel({
    titulo: 'Bastante buena, pero lenta',
    contenido: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis unde tempora consectetur, quia consequuntur repellendus doloremque amet! Quidem illum et aspernatur maiores porro unde sunt repellendus veritatis, fuga aut cupiditate?',
    rating: 4,
    product: pelicula._id,
    user: newUser._id, 
    nombreuser: newUser.username,
    createdAt: new Date(2024, 3, 8)
});

var review3 = new ReseñasModel({
  titulo: 'Bien',
  contenido: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis unde tempora consectetur, quia consequuntur repellendus doloremque amet! Quidem illum et aspernatur maiores porro unde sunt repellendus veritatis, fuga aut cupiditate?',
  rating: 4,
  product: cocaCola._id,
  user: newUser._id, 
  nombreuser: newUser.username,
  createdAt: new Date(2024, 3, 8)
});

var reviews = [review1, review2, review3];

router.get('/', function(req, res) {
  res.send('Hola');
});

router.get('/resenas', async (req, res)=> {
    try {

        //const reviews = await ReseñasModel.find();
        reviews = añadirCamposFaltantes();
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

function añadirCamposFaltantes(){
  review1 = {
    titulo: review1.titulo,
    contenido: review1.contenido,
    rating: review1.rating,
    product: pelicula.nombre,
    categoria: pelicula.categoria,
    user: newUser.username, 
    createdAt: moment(review1.createdAt).format('DD/MM/YYYY'),
    linkImagen: "https://upload.wikimedia.org/wikipedia/en/a/af/The_Godfather%2C_The_Game.jpg"
  };

  review2 = {
    titulo: review2.titulo,
    contenido: review2.contenido,
    rating: review2.rating,
    product: pelicula.nombre,
    categoria: pelicula.categoria,
    user: newUser.username, 
    createdAt: moment(review2.createdAt).format('DD/MM/YYYY'),
    linkImagen: "https://upload.wikimedia.org/wikipedia/en/a/af/The_Godfather%2C_The_Game.jpg"
  };
  review3 ={
    titulo: review3.titulo,
    contenido: review3.contenido,
    rating: review3.rating,
    product: cocaCola.nombre,
    categoria: cocaCola.categoria,
    user: newUser.username, 
    createdAt: moment(review3.createdAt).format('DD/MM/YYYY'),
    linkImagen: "https://coca-colafemsa.com/wp-content/uploads/2019/11/3-1.png"
  };
  return [review1, review2, review3];

}

module.exports = router;