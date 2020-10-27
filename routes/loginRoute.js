//Imoprtamos express
const express = require("express");
//Importamos ROUTER
const router = express.Router();
//Importamos el CONTROLLER
const loginController = require("../controller/loginController");
//Importamos el VALIDATOR
const { check } = require("express-validator");
//-------------------------------------------------------
module.exports = () => {
  //Verificacion de LOGIN entradas verficadas con EXPRESS-VALIDATOR
  router.post(
    "/",
    [
      check("user", "El nombre es obligatorio").not().isEmpty(),
      check("pass", "El password debe ser minio 8 caracteres").isLength({
        min: 4,
      }),
    ],
    loginController.loginUser
  );
  return router;
};
