var express = require('express');
const moment = require('moment');
const Sequelize = require('sequelize');

const ReseñasModel = require('../Modelos/Review');
const UserModel = require('../Modelos/User');
const ProductoModel = require('../Modelos/Producto');
const ComentarioModel = require('../Modelos/Comentario');

var router = express.Router();

router.get('/', async function (req, res) {
    const comentarios = await ComentarioModel.findAll({include: [{ model: UserModel, as: 'User', attributes: ['username'] }]});
  res.json(comentarios)
});

module.exports = router;