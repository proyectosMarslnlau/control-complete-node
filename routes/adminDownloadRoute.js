//Importamos express
const express = require('express');
//Importamos ROUTER
const router = express.Router();
//Importamos el controller
const adminControllerDownload = require('../controller/adminControllerDownload');
//++++++++++++++++++++++++++++++++++++++++++++
module.exports = () => {
    router.post('/listar-information', adminControllerDownload.listarInformacion);
    router.post('/listar-date-information', adminControllerDownload.listarDatosDocente);

    router.get('/descargar-documento', adminControllerDownload.descargarDocumento);

    router.post('/verificar-datos-fecha', adminControllerDownload.verificarInformacionFecha);
    router.get('/descargar-excel', adminControllerDownload.descargarArchivoExcel);
    router.get('/descargar-pdf', adminControllerDownload.documentoPDF);
    return router;
}