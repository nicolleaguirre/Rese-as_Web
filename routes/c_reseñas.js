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

function modificarFecha(fecha) {
  if (!(fecha instanceof Date)) {
    return "Fecha inválida";
  }
  // Obtener los componentes de la fecha
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const año = fecha.getFullYear();

  // Formatear la fecha en el formato deseado (DD/MM/YYYY)
  return `${dia}/${mes}/${año}`;
}

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
    const nuevaResena = await ReseñasModel.create(req.body);
    const resenaConProducto = await ReseñasModel.findByPk(nuevaResena.id, {
      include: [
        { model: ProductoModel, as: 'Producto', attributes: ['nombre', 'categoria'] }
      ]
    });
    res.status(201).json({ message: 'Reseña creada correctamente', data: resenaConProducto });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;