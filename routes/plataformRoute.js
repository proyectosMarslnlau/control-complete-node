//Importamos express
const express = require("express");
//Importamos el ROUTER
const router = express.Router();
//Importamos el Controller
const plataformController = require("../controller/plataformController");

//-------------------------------------------------
module.exports = () => {
  //Routas de PLATAFORMAS de aprendizaje
  router.post("/plataform", plataformController.plataformUser);
  //
  return router;
};
