//Importamos express
const express = require("express");
//Importamos ROUTER
const router = express.Router();
//Importamos el CONTROLLER
const timerController = require("../controller/timerController");
//++++++++++++++++++++++++++++++++++++++++++++
module.exports = () => {
  //Routas de FECHA
  router.post("/date", timerController.dateUser);
  //Routas de TIME INICIO
  router.post("/timerstart", timerController.timeStart);
  //Routas de TIME FINAL
  router.post("/timerend", timerController.timeEnd);
  //
  return router;
};
