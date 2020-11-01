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
    "/",loginController.loginUser
  );
  return router;
};
