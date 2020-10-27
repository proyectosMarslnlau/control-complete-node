//Importamos SEQUEALIZE
const Sequelize = require("sequelize");
//Importamos la BD
const db = require("../config/db");

//Creamos la TABLA DE DATOS
const Docente = db.define("docente", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  carnet: {
    type: Sequelize.STRING,
  },
  materia: {
    type: Sequelize.STRING,
  },
  sigla: {
    type: Sequelize.STRING,
  },
});
module.exports = Docente;
