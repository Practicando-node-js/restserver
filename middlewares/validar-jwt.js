const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req, res = response, next) => {
  const token = req.header("x-token");
  //   console.log(token);
  if (!token) {
    return res.status(401).json({
      msg: "Acceso denegado - se requiere el token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);

    // leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no valido - usuario NO EXISTE en db",
      });
    }
    // verificar si el estado es true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no valido - usuario con estado false",
      });
    }
    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = { validarJWT };
