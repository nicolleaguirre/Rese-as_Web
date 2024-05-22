const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const sequelize = require('./sequelize');
const {DataTypes} = require('sequelize')
const Token = require('./Modelos/token')(sequelize, DataTypes);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const reseñasRouter = require('./routes/c_reseñas');
const app = express();

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


// Importar modelos
//const Comentario = require('./Modelos/Comentario')(sequelize, Sequelize.DataTypes);
const Producto = require('./Modelos/Producto');
const User = require('./Modelos/User');
const Review = require('./Modelos/Review');

// Definir asociaciones
//Comentario.associate(sequelize.models);

Review.associate({ Producto, User });

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

// Sincronizar modelos con la base de datos
/*sequelize.sync({ force: true })
  .then(() => {
    console.log('Tablas sincronizadas correctamente.');
  })
  .catch((error) => {
    console.error('Error al sincronizar tablas:', error);
  });*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    await Token.invalidate(token); 
    res.send('Cierre de sesión exitoso.');
  } catch (error) {
    console.error('Error al cerrar la sesión:', error);
    res.status(500).send('Ocurrió un error al cerrar la sesión.');
  }
});

const port = 4001;
app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});

app.get('', (req, res) => {
  res.send("Hola");
});

module.exports = app;
