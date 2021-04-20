const Role = require("../models/roles");
const Usuario = require("../models/usuario");

const esRolvalido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la db`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El correo: ${correo} ya existe en la db`);
  }
};

const emailExisteUsuarioPorId = async (id) => {
  const existeUser = await Usuario.findById(id);

  if (!existeUser) {
    throw new Error(`El Id: ${id} no existe en la db`);
  }
};

module.exports = { esRolvalido, emailExiste, emailExisteUsuarioPorId };
