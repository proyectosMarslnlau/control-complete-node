//Importamos SEQUELIZE
const Sequelize = require("sequelize");

const db = require("../config/db");

//Creamos la Base de DATOS
const Login = db.define("login", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING,
  },
  usuario: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  carnet: {
    type: Sequelize.STRING,
  },
  tipo: {
    type: Sequelize.STRING,
    defaultValue: "docente",
  },
  email: {
    type: Sequelize.STRING,
    defaultValue: "electronica2018@gmail.com",
  },
});

module.exports = Login;
