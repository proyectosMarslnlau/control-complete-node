//Imoprtamos las variables de entorno
require("dotenv").config({ path: "../variable.env" });
//Iimportamos el MODELLL
const docenteModell = require("../modells/docenteModell");

//---------------------------------------------------
exports.docenteMaterias = async (req, res) => {
  try {
    //Numero de identificacion el CARNET  de USUARIO
    const { carnet } = req.body;
    //Peticion de todas las MATERIAS del docente IDENTIFICADO con CARNET
    const peticion = await docenteModell.findAll({
      where: { carnet },
    });
    //Verificamos si EXISTE el DOCENTE
    if (peticion.length === 0) {
      res.json({ request: "null" });
    } else {
      res.json({ request: peticion });
    }
  } catch (error) {
    res.status(400).json({ request: "EXISTE UN PROBLEMA" });
  }
};
