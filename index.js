//Importamos EXPRESS
const express = require("express");
//Importamos las variables de entorno
require("dotenv").config({ path: "./variable.env" });
//Importamos el APP
const app = require("./app");
//Importmoas la configuracion de base de datos
const db = require("./config/db");

//-----------------------------------------------
//Invocamos las variables de entotno
const PORT_SERVER = process.env.PORT_SERVER;
//Verificamos la conexion a la base de datos
//Sync nos permite sincronizar las tablas p columnas faltantes
db.sync()
  .then(() => console.log("CONEXION CORRECTA NUEVAs"))
  .catch((error) => console.log(error));

//Colocamos la conexion de usuario
app.listen(PORT_SERVER, () => {
  console.log(`SERVICIO FUNCIONANDO POR EL PUERTO ${PORT_SERVER}`);
});
