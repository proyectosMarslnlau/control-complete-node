//Importamos EPRESS
const express = require("express");
//Instanciamos EXPRESS
const app = express();
//Importamos las variables de entorno
require("dotenv").config({ path: "./variable.env" });
//Importamos CORS
const cors = require('cors');
//Importamos las routas
const loginRouter = require("./routes/loginRoute");
const docenteRouter = require("./routes/docenteRoute");
const plataformRouter = require("./routes/plataformRoute");
const timerRouter = require("./routes/timerRoute");
const datosRouter = require("./routes/datosRoute");

const adminLoginRoute = require('./routes/adminLoginRoute');
const adminDocenteRoute = require('./routes/adminDocenteRoute');

const adminPlataformRoute = require('./routes/adminPlataformRoute');

const adminUploadRoute = require('./routes/adminUploadRoute');
const adminDownloadRoute = require('./routes/adminDownloadRoute');
//-----------------------------------------------
//Habilitamos el uso de JSON en el sistema
app.use(express.json({ extended: true }));

///Imvocamos la funcion que nos permite usar imagenes estaticas
app.use("/state", express.static("public"));

//Invocamos CORS
app.use(cors())

//Creamos la rutas
app.use("/api", loginRouter());
app.use("/api", docenteRouter());
app.use("/api", plataformRouter());
app.use("/api", timerRouter());
app.use("/api", datosRouter());
app.use('/admin', adminLoginRoute());
app.use('/admin', adminDocenteRoute());
app.use('/plataform', adminPlataformRoute());
app.use('/upload', adminUploadRoute());
app.use('/download', adminDownloadRoute());
module.exports = app;
