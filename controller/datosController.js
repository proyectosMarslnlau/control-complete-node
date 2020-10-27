//Importamos variables de entorno
require("dotenv").config({ path: "../variable.env" });
//Importamos el MODELL
const fs = require("fs");
//Importamos la LIBRERIA de los ID  DINAMICOS
const shortid = require("shortid");
//Importamos el MODELL
const datosModell = require("../modells/datosModell");
const loginModell = require("../modells/loginModell");
//Funciones para el EMAIL
const emailFunction = require("../resource/js/functionEmail");
//++++++++++++++++++++++++++++++++++++++
exports.datosIngresados = async (req, res) => {
  try {
    //Datos recibidos de la APLICACION
    const datos = req.body;
    //DESTRUCCION de las variables de DATOS
    const {
      materia,
      titulo,
      cantidad,
      fecha,
      horaini,
      plataforma,
      avance,
      respaldo,
      horafinal,
      foto,
      observacion,
      identificador,
    } = datos.store;
    //++++++++++++++++++++++++++++++++++++++++++++++
    //Desglosamos las VARIABLES DE LLEGADA
    //FECHA ACTUAL
    const fechaEnd = fecha.fecha;
    //Hora de inicio de la CLASE
    const horaStart = horaini.horaini;
    //Hora final de la CLASE
    const horaEnd = horafinal.horafin;
    //------------------------------
    //Modificacion de nombre para la PHOTO
    //Foton en BASE 64
    const DIRECCION = process.env.DIRECCION_IMAGEN;
    let fotoEnd = foto.resourcePath.data;
    //Generador de ID UNICOS
    const idUnique = shortid.generate();
    //Creacion de la direccion de la imagen
    const namePhoto = idUnique + "_" + identificador + ".jpg";
    //Nombre de PHOTO para la BASE DE DATOS
    const namePhotoDataBase = DIRECCION + namePhoto;
    //++++++++++++++++++++++++++++++++++++++++++++++
    if (respaldo === true) {
      const peticion = await loginModell.findAll({
        where: {
          carnet: identificador,
        },
        raw: true,
      });
      const emailUser = peticion[0].email;
      //Funcion envia EMAIL
      emailFunction(emailUser, fechaEnd, horaStart, horaEnd);
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++
    //Guardado de Informacion CREATE SEQUEALIZE
    const saveDatos = await datosModell.create({
      carnet: identificador,
      materia: materia,
      titulo: titulo,
      cantidad: cantidad,
      fecha: fechaEnd,
      horaini: horaStart,
      horafin: horaEnd,
      plataforma: plataforma,
      avance: avance,
      respaldo: respaldo,
      foto: namePhotoDataBase,
      observacion: observacion,
    });

    //+++++++++++++++++++++++++++++++++++++++++++++
    //Copiado de IMAGEN en la CARPETA PUBLIC
    fs.writeFile(
      `./public/img_docente/${namePhoto}`,
      fotoEnd,
      { encoding: "base64" },
      function (err) {
        console.log("File created");
      }
    );
    //++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.json({ msg: "correcto" });
  } catch (error) {
    res.status(400).json({ msg: "ERROR DEL CATCH" });
  }
};
