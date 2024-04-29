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
    res.json({
      data: reviews2,
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

module.exports = router;