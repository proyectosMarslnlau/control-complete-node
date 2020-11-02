//Importamos las variables de entorno
require("dotenv").config({ path: "../variable.env" });
//Importamos MOMENT
const moment = require("moment");
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.dateUser = async (req, res) => {
  try {
    const fecha = moment().format("l");
    res.json({ response: fecha });
  } catch (error) {
    res.status(400).json({ response: "error" });
  }
};
exports.timeStart = async (req, res) => {
  try {
    const timeStart = moment().format("LTS");
    res.json({ response: timeStart });
  } catch (error) {
    res.status(400).res.json({ response: "error" });
  }
};
exports.timeEnd = async (req, res) => {
  try {
    const timeEnd = moment().format("LTS");
    res.json({ response: timeEnd });
  } catch (error) {
    res.status(400).json({ response: "error" });
  }
};
