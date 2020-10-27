//Importamos Express
const express = require('express');
//Importamos Router
const router = express.Router();
//Importamos el CONTROLLER
const adminControllerLogin = require('../controller/adminControllerLogin');
//--------------------------------------------
module.exports = () => {

    router.post('/login', adminControllerLogin.loginAdministrador);
    return router;
}