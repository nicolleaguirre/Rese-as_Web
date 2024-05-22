var express = require('express');
const moment = require('moment');
const Sequelize = require('sequelize');

const ReseñasModel = require('../Modelos/Review');
const UserModel = require('../Modelos/User');
const ProductoModel = require('../Modelos/Producto');

var router = express.Router();

router.get('/', function (req, res) {
  res.send('Hola');
});

router.get('/resenas', async (req, res) => {
  try {
    const reviews2 = await ReseñasModel.findAll({
      include: [
        { model: UserModel, as: 'User', attributes: ['username'] },
        { model: ProductoModel, as: 'Producto', attributes: ['nombre', 'categoria'] }
      ]
    });
    if (reviews2.length === 0) {
      res.json({ message: 'No se encontraron reseñas.' });
    }
    const groupedReviews = reviews2.reduce((acc, review) => {
      const categoria = review.Producto.categoria;
      if (!acc[categoria]) {
        acc[categoria] = [];
      }
      acc[categoria].push(review);
      return acc;
    }, {});

    // Formatear el resultado para mostrar las reseñas agrupadas por categoría
    const formattedResult = Object.keys(groupedReviews).map(categoria => ({
      categoria,
      reviews: groupedReviews[categoria]
    }));
    res.json({
      data: formattedResult,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/mis_resenas/:usuarioID', async (req, res) => {
  try {
    const usuarioID = req.params.usuarioID;
    const reviews = await ReseñasModel.findAll({
      include: [
        { model: UserModel, as: 'User', attributes: ['username'] },
        { model: ProductoModel, as: 'Producto', attributes: ['nombre', 'categoria'] }
      ],
      where: {usuarioID}

    });
    if (reviews.length === 0) {
      res.json({ message: 'No se encontraron reseñas.' });
    }else{
      res.json({
        data: reviews,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/crear_resena', async (req, res) => {
  try {
    const precio = 0
    const {titulo, categoria, nombre, rating, userID, contenido} = req.body;
    const Producto = await ProductoModel.findOne({where: {nombre}});
    var nuevaResena;
    var productoID;
    if (!Producto) {
      const nuevoProducto = await ProductoModel.create({nombre, precio, categoria });
      productoID = nuevoProducto.id;
      nuevaResena = await ReseñasModel.create({titulo, contenido, rating, userID, productoID  });
      res.send().json({msg: "Se añadio correctamente"});
    } else{
      productoID = Producto.id;
      nuevaResena = await ReseñasModel.create({titulo, contenido, rating, userID, productoID  });
      res.send().json({msg: "Se añadio correctamente"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;