//Imoprtamos SEQUEALIZE
const Sequelize = require("sequelize");

const db = require("../config/db");

//Creamos la base de datos
const Plataforma = db.define("plataforma", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  plataforma: {
    type: Sequelize.STRING,
  },
});
module.exports = Plataforma;
