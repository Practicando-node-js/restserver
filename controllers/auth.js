const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // verificar user
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password nos conrrectos -> correo",
      });
    }

    // validar estado
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password nos conrrectos -> estado:false",
      });
    }
    // validar pass
    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(400).json({
        msg: "Usuario / Password nos conrrectos -> contraseña",
      });
    }
    // generar  el JWT
    const token = await generarJWT(usuario.id);

    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el admin",
    });
  }
};

module.exports = { login };
