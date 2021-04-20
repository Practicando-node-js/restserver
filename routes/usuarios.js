const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosDelete,
  usuariosPost,
  usuariosPut,
} = require("../controllers/usuarios");
const {
  esRolvalido,
  emailExiste,
  emailExisteUsuarioPorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuariosGet);

//PUT
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(emailExisteUsuarioPorId),
    check("rol").custom(esRolvalido),
  ],
  validarCampos,

  usuariosPut
);
// post
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio y debe ser mayor de 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "El correo no es válido").isEmail(),
    check("rol").custom(esRolvalido),
    check("correo").custom(emailExiste),
    validarCampos,
  ],
  usuariosPost
);
// check("rol", "El rol no es válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
// delete
router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(emailExisteUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
