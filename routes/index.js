var express = require('express');
var router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ReseñasPrueba',
  password: 'tang',
  port: 5432,
});

router.get('/consulta', async (req, res) => {
  try {
    // Realiza la consulta a la base de datos
    //const result = await pool.query('SELECT * FROM public."Prueba"');
    // Envía la respuesta con los resultados de la consulta
    //res.json(result.rows);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ error: error});
  }
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Esto es el index del back' });
});

module.exports = router;
