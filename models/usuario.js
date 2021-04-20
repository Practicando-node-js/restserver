const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "Se requiere el nombre"],
  },
  correo: {
    type: String,
    required: [true, "Se requiere el coreeo"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Se requiere la contraseña"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuarios } = this.toObject();
  return usuarios;
};

module.exports = model("Usuario", UsuarioSchema);
