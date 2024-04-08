var express = require('express');
const UserModel = require('../Modelos/User');
var router = express.Router();


//Ruta para tener un usuario de prueba
router.get('/users', async (req, res) => {
  try {
    const newUser = new UserModel({
      username: "Hola",
      email: "Hola",
      password: "Hola"
    });

    //await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
