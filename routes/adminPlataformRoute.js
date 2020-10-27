//Importamos express
const express = require('express');
//Improtamos ROUTER
const router = express.Router();
//Iimrpotamos el CONTROLLER
const adminControllerPlataforma = require('../controller/adminControllerPlataform');
//------------------------------
module.exports = () => {
    router.post('/listar-plataform', adminControllerPlataforma.listarPlataform);
    router.post('/update-plataform', adminControllerPlataforma.anadirPlataform);
    router.post('/delete-plataform', adminControllerPlataforma.borrarPlataforma);
    return router;
}