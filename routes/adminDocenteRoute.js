//Importamos EXPRESS
const express = require('express');
//Importamos ROUTE
const router = express.Router();
//Improtamos el Controller
const adminControllerDocente = require('../controller/adminControllerDocente');
//+++++++++++++++++++++++++++++++++++++
module.exports = () => {
    router.post('/teacher', adminControllerDocente.docenteAdministrador);
    router.post('/signature', adminControllerDocente.docenteMateriasAdministrador);
    router.post('/add-asignature', adminControllerDocente.docenteMateriaAnadirMateria);
    router.post('/delete-asignature', adminControllerDocente.docenteBorrarMateria);
    router.post('/update-docente', adminControllerDocente.docenteFichaTecnica);
    router.post('/new-docente', adminControllerDocente.docenteNuevo);
    router.post('/delete-docente', adminControllerDocente.docenteBorrar);
    return router;
}