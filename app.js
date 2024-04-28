var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { Pool } = require('pg');
const sequelize = require('./sequelize');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reseñasRouter = require('./routes/c_reseñas')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ReseñasPrueba',
  password: 'tang',
  port: 5432,
});

var app = express();

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/resenas', reseñasRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

const port = 4001;
app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});

app.get('', (req, res) =>{
  res.send("Hola");
});

pool.query('SELECT NOW()', (error, result) => {
  if (error) {
    console.error('Error al ejecutar la consulta:', error);
  } else {
    console.log('La base de datos está conectada. Hora actual:', result.rows[0].now);
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con la base de datos');
    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('Error al conectar y sincronizar con la base de datos:', error);
  }
})();

module.exports = app;
