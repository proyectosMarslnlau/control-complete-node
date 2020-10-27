//Importamos SEQUEALIZE
const Sequelize = require("sequelize");
//Importamos la base de datos
const db = require("../config/db");
//Creamos la TABLA DE BASE DE DATOS
const Datos = db.define("datos", {
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
  titulo: {
    type: Sequelize.STRING,
  },
  cantidad: {
    type: Sequelize.STRING,
  },
  fecha: {
    type: Sequelize.STRING,
  },
  horaini: {
    type: Sequelize.STRING,
  },
  horafin: {
    type: Sequelize.STRING,
  },
  plataforma: {
    type: Sequelize.STRING,
  },
  avance: {
    type: Sequelize.STRING,
  },
  respaldo: {
    type: Sequelize.STRING,
  },
  foto: {
    type: Sequelize.STRING,
  },
  observacion: {
    type: Sequelize.STRING,
  },
});
module.exports = Datos;
