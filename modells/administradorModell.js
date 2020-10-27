//Importamos SEQUEALIZE
const Sequelize = require('sequelize');
//Improtamos la BASE DE DATOS
const db = require('../config/db');
//
const Admin = db.define('admin', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    identificador : {
        type : Sequelize.STRING
    },
    user : {
        type : Sequelize.STRING
    },
    pass : {
        type : Sequelize.STRING
    },
});

module.exports = Admin;