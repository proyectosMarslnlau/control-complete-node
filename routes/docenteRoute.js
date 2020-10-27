//Importmaos EXPRESS
const express = require("express");
//Imprtamos ROUTER
const router = express.Router();
//Importamos el Controller
const docenteController = require("../controller/docenteController");
//-----------------------------
module.exports = () => {
  //Routa de Peticion de Materias de DOCENTE
  router.post("/teacher", docenteController.docenteMaterias);
  return router;
};
