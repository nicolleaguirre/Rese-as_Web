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

router.get('/comentarios/:id', async (req, res)=>{
  const reseñaID = req.params.id;
  const comentarios = await ComentarioModel.findAll(
    {
      where: {reseñaID: reseñaID},
      include: 
      [{ model: UserModel, as: 'User', attributes: ['username'] },
      ]
  });
  if(comentarios.length > 0){
    res.json({data: comentarios});
  } else {
    res.json({data: 'No hay comentarios'});
  }
});

router.post('/crear_comentario/:id', async (req, res) =>{
  const {usuarioID, contenido, calificacion} = req.body;
  const reseñaID = req.params.id;
  var nuevoProducto = await ComentarioModel.create({  contenido, usuarioID, reseñaID, calificacion });
  res.json({msg: 'Se añadio correctamente'})
});

module.exports = router;