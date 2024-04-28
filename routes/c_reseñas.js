var express = require('express');
const moment = require('moment');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const ReseñasModel = require('../Modelos/Review')(sequelize, Sequelize.DataTypes);
  const UserModel = require('../Modelos/User')(sequelize, Sequelize.DataTypes);
  const ProductoModel = require('../Modelos/Producto')(sequelize, Sequelize.DataTypes);

  var router = express.Router();

  newUser = {
    _id: 1,
  };

  const pelicula = new ProductoModel({
    nombre: "The Godfather",
    descripcion: "Director: Francis Fod Coppola",
    categoria: "Pelicula",
    precio: 0,
  });

  const cocaCola = new ProductoModel({
    nombre: "Cocacola",
    descripcion: "",
    categoria: "Producto",
    precio: 3000,
  });

  var review1 = new ReseñasModel({
    titulo: 'Excelente película, una obra maestra',
    contenido: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis unde tempora consectetur, quia consequuntur repellendus doloremque amet! Quidem illum et aspernatur maiores porro unde sunt repellendus veritatis, fuga aut cupiditate?',
    rating: 5,
    product: pelicula._id,
    user: newUser._id,
    createdAt: new Date(2024, 3, 8),
  });

  var review2 = new ReseñasModel({
    titulo: 'Bastante buena, pero lenta',
    contenido: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis unde tempora consectetur, quia consequuntur repellendus doloremque amet! Quidem illum et aspernatur maiores porro unde sunt repellendus veritatis, fuga aut cupiditate?',
    rating: 4,
    product: pelicula._id,
    user: newUser._id,
    createdAt: new Date(2024, 3, 8),
  });

  var review3 = new ReseñasModel({
    titulo: 'Bien',
    contenido: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis unde tempora consectetur, quia consequuntur repellendus doloremque amet! Quidem illum et aspernatur maiores porro unde sunt repellendus veritatis, fuga aut cupiditate?',
    rating: 4,
    product: cocaCola._id,
    user: newUser._id,
    createdAt: new Date(2024, 3, 8),
  });

  var reviews = [review1, review2, review3];

  router.get('/', function (req, res) {
    res.send('Hola');
  });

  router.get('/resenas', async (req, res) => {
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

  router.get('/mis_resenas/:idUser', (req, res) => {
    try {
      var misReviews = [];
      reviews.forEach((obj) => {
        if (obj.user.equals(req.params.idUser)) {
          misReviews.push(obj);
        }
      });

      res.json({ data: misReviews });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};