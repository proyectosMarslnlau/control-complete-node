//Importamos EXPRESS
const express = require("express");
//Importamos ROUTER
const router = express.Router();
//Importamos el CONTROLLER
const datosController = require("../controller/datosController");
//---------------------------------------
module.exports = () => {
  //Routas de INSCRIPCION DE DATOS
  router.post("/dates", datosController.datosIngresados);
  return router;
};
