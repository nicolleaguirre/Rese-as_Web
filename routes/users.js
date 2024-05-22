const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../Modelos/User');
const { where } = require('sequelize');

var router = express.Router();

var sesionIniciada = false;

/*const usuarioPrueba = new User({
  username: "Juan Prueba",
  email: "prueba@gmail.com",
  password: "123456"
});*/

// Middleware para registrar las solicitudes
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} a ${req.url}`);
  next();
});
router.use(express.json());

router.get('/prueba', async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.status(201).json(usuarios);
  } catch (error) {

    res.status(500).json({ error: error });
  }
});

//mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

//Inicio de sesión
router.post('/login/', async (req, res) => {
  try {
    //const email = req.params.email;
    //const password = req.params.password;
    const {email, password} = req.body;
    const usuario = await User.findOne({where: {email}});
    
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    console.log(usuario);
    
    //const contrasenaValida = await bcrypt.compare(password, usuario.password);
    //const contrasenaValida = password == usuario.password;
    const contrasenaValida = await bcrypt.compare(password, usuario.password);
    if (!contrasenaValida) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    };
    const token = jwt.sign({ id: usuario.id }, 'tu_clave_secreta', {expiresIn: '1h'});
    //const token = jwt.sign({ username: usuario.username }, 'ClaveResenas', { expiresIn: '10h' });
    //console.log(token);
    res.status(200).json({ usuario, token });

  } catch(err) {
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  // Verifica si hay un token
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // Verifica el token
  jwt.verify(token, 'clave_secreta', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    // Si el token es válido, continúa con la solicitud
    req.usuario = decoded;
    next();
  });
}

router.post('/registrar', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ where: {email} });
      if (user) {
        return res.status(400).json({ msg: 'El usuario ya existe' });
      }
      //const salt = await bcrypt.genSalt(10);
      //const hashedPassword = await bcrypt.hash(password, salt);
      //const verificationCode = crypto.randomBytes(3).toString('hex');
      user = await new User({
        username: username,
        email: email,
        password: password,
        verificationCode: 123,
        isVerified: true
      });

      await user.save();
      res.json({msg: "Se registro"});

    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Error del servidor' });
    }
});

module.exports = router;
