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
      where: { usuarioID }

    });
    if (reviews.length === 0) {
      res.json({ message: 'No se encontraron reseñas.' });
    } else {

      const groupedReviews = reviews.reduce((acc, review) => {
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
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/crear_resena', async (req, res) => {
  try {
    console.log(req.body);
    const { titulo, categoria, nombre, rating, usuarioID, contenido, precio } = req.body;
    const Producto = await ProductoModel.findOne({ where: { nombre } });
    var nuevaResena;
    var productoID;
    if (!Producto) {
      const nuevoProducto = await ProductoModel.create({ nombre, precio, categoria });
      productoID = nuevoProducto.id;
      nuevaResena = await ReseñasModel.create({ titulo, contenido, rating, productoID, usuarioID });
      res.json({ msg: "Se añadio correctamente" });
    } else {
      productoID = Producto.id;
      nuevaResena = await ReseñasModel.create({ titulo, contenido, rating, productoID, usuarioID });
      res.json({ msg: "Se añadio correctamente" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/eliminar/:id', async (req, res)=>{
  const id = req.params.id;
  console.log(id)
  await ReseñasModel.update({ estado: false }, { where: { id } });
  res.json({ message: 'Reseña marcada como inactiva' });
});

router.get('/resena/:id', async (req, res)=>{
  const id = req.params.id;
  console.log(id);
  const reseña = await ReseñasModel.findOne({ where: {id},
    include: [
      { model: UserModel, as: 'User', attributes: ['username'] },
      { model: ProductoModel, as: 'Producto', attributes: ['nombre', 'categoria', 'precio'] }
    ]});
  if(!reseña){
    res.json({msg: 'No se encontró la reseña'});
  }else{
    res.json({reseña: reseña});
  }
});

router.put('/editar_resena/:id', async (req, res)=>{
  const {id} = req.params
  console.log(id);
  const { titulo, rating, contenido} = req.body;
  const result=await ReseñasModel.update(
    {
      titulo: titulo,
      contenido: contenido,
      rating: rating
    }, {where: {id : id}}
  );
  if(result[0]===0){
    return res.json({message: 'Reseña no encontrada'});
  }
  res.json({ message: 'Reseña actualizada' });
});

// Añadir ruta para reportar una reseña
router.post('/reportar', async (req, res) => {
  const { reseñaId } = req.body;

  try {
    const review = await ReseñasModel.findByPk(reseñaId);

    if (!review) {
      return res.status(404).send({ error: 'Reseña no encontrada' });
    }

    data = review.reportes; //(review.reports || 0) + 1;

    console.log('Reportes:', data); // Verificar que se estén contando los reportes

    await review.update({ reportes: data + 1 });

    if (review.reportes >= 10) {
      await ReseñasModel.update({ estado: false }, { where: { id: reseñaId } });
    }

    res.status(200).send({ message: 'Reseña reportada exitosamente' });
  } catch (error) {
    console.error('Error al reportar la reseña:', error);
    res.status(500).send({ error: 'Ocurrió un error al reportar la reseña' });
  }
});


module.exports = router;