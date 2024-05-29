const express = require('express');
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const ReseñasModel = require('../Modelos/Review');
const UserModel = require('../Modelos/User');
const ProductoModel = require('../Modelos/Producto');

const router = express.Router();

// Ruta principal
router.get('/', (req, res) => res.send('Hola'));

// Obtener todas las reseñas
router.get('/resenas', async (req, res) => {
  try {
    const reviews = await ReseñasModel.findAll({
      include: [
        { model: UserModel, as: 'User', attributes: ['username'] },
        { model: ProductoModel, as: 'Producto', attributes: ['nombre', 'categoria'] },
      ],
    });

    if (!reviews.length) {
      return res.json({ message: 'No se encontraron reseñas.' });
    }

    const groupedReviews = reviews.reduce((acc, review) => {
      const { categoria } = review.Producto;
      acc[categoria] = acc[categoria] || [];
      acc[categoria].push(review);
      return acc;
    }, {});

    const formattedResult = Object.keys(groupedReviews).map(categoria => ({
      categoria,
      reviews: groupedReviews[categoria],
    }));

    res.json({ data: formattedResult });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener reseñas de un usuario específico
router.get('/mis_resenas/:usuarioID', async (req, res) => {
  try {
    const { usuarioID } = req.params;

    const reviews = await ReseñasModel.findAll({
      include: [
        { model: UserModel, as: 'User', attributes: ['username'] },
        { model: ProductoModel, as: 'Producto', attributes: ['nombre', 'categoria'] },
      ],
      where: { usuarioID },
    });

    if (!reviews.length) {
      return res.json({ message: 'No se encontraron reseñas.' });
    }

    const groupedReviews = reviews.reduce((acc, review) => {
      const { categoria } = review.Producto;
      acc[categoria] = acc[categoria] || [];
      acc[categoria].push(review);
      return acc;
    }, {});

    const formattedResult = Object.keys(groupedReviews).map(categoria => ({
      categoria,
      reviews: groupedReviews[categoria],
    }));

    res.json({ data: formattedResult });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una nueva reseña
router.post('/crear_resena', async (req, res) => {
  try {
    const { titulo, categoria, nombre, rating, usuarioID, contenido, precio } = req.body;

    let producto = await ProductoModel.findOne({ where: { nombre } });

    if (!producto) {
      producto = await ProductoModel.create({ nombre, precio, categoria });
    }

    await ReseñasModel.create({ titulo, contenido, rating, productoID: producto.id, usuarioID });

    res.json({ msg: 'Se añadió correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Marcar reseña como inactiva
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ReseñasModel.update({ estado: false }, { where: { id } });
    res.json({ message: 'Reseña marcada como inactiva' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una reseña por ID
router.get('/resena/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const reseña = await ReseñasModel.findOne({
      where: { id },
      include: [
        { model: UserModel, as: 'User', attributes: ['username'] },
        { model: ProductoModel, as: 'Producto', attributes: ['nombre', 'categoria', 'precio'] },
      ],
    });

    if (!reseña) {
      return res.json({ msg: 'No se encontró la reseña' });
    }

    res.json({ reseña });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Editar una reseña
router.put('/editar_resena/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, rating, contenido } = req.body;

    const result = await ReseñasModel.update({ titulo, contenido, rating }, { where: { id } });

    if (result[0] === 0) {
      return res.json({ message: 'Reseña no encontrada' });
    }

    res.json({ message: 'Reseña actualizada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reportar una reseña
router.post('/reportar', async (req, res) => {
  try {
    const { reseñaId } = req.body;
    const review = await ReseñasModel.findByPk(reseñaId);

    if (!review) {
      return res.status(404).send({ error: 'Reseña no encontrada' });
    }

    await review.update({ reportes: review.reportes + 1 });

    if (review.reportes >= 10) {
      await ReseñasModel.update({ estado: false }, { where: { id: reseñaId } });
    }

    res.status(200).send({ message: 'Reseña reportada exitosamente' });
  } catch (error) {
    res.status(500).send({ error: 'Ocurrió un error al reportar la reseña' });
  }
});

// Obtener reseñas filtradas
router.get('/filtrar', async (req, res) => {
  try {
    const { producto, calificacion } = req.query;

    const filters = { estado: true };
    if (producto) filters['$Producto.nombre$'] = { [Op.like]: `%${producto}%` };
    if (calificacion) filters.rating = calificacion;

    const resenas = await ReseñasModel.findAll({
      where: filters,
      include: [
        { model: UserModel, as: 'User', attributes: ['username'] },
        { model: ProductoModel, as: 'Producto', attributes: ['nombre', 'categoria'] },
      ],
    });

    if (!resenas.length) {
      return res.json({ message: 'No se encontraron reseñas.' });
    }

    const groupedReviews = resenas.reduce((acc, review) => {
      const { categoria } = review.Producto;
      acc[categoria] = acc[categoria] || [];
      acc[categoria].push(review);
      return acc;
    }, {});

    const formattedResult = Object.keys(groupedReviews).map(categoria => ({
      categoria,
      reviews: groupedReviews[categoria],
    }));

    res.json({ data: formattedResult });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
