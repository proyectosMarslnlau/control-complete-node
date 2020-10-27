//Importamos las variables de entorno
require("dotenv").config({ path: "../variable.env" });
//Importamos el MODELO de plataforma a utilizar
const PlataformModell = require("../modells/plataformModell");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.plataformUser = async (req, res) => {
  try {
    const peticionPlataforma = await PlataformModell.findAll();
    res.json({ request: peticionPlataforma });
  } catch (error) {
    res.status(400).json({ msg: "ERROR DE SERVICIO DE PLATAFORMAS" });
  }
};
