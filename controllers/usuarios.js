const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { n = null, q = null } = req.query;
  res.json({
    msg: "get API - controllers",
    n,
    q,
  });
};

const usuariosPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put API - controllers",
    id,
  });
};

const usuariosPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.json({
    msg: "post API - controllers",
    nombre,
    edad,
  });
};
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controllers",
  });
};

module.exports = {
  usuariosGet,
  usuariosDelete,
  usuariosPost,
  usuariosPut,
};
