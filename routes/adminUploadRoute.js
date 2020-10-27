//Imoprtamos EXPRESS
const express = require('express');
//Importamos ROUTER
const router = express.Router();
//Importamos el controller
const adminControllerUpload = require('../controller/adminControllerUpload');
//
//
const upload = require("../middleware/upload");
//+++++++++++++++++++++++++++++++++++++
module.exports = () => {
    router.post('/file', upload.single("file"), adminControllerUpload.uplaodFile);
    return router;
}