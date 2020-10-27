//Importamos la libreria de GMAIL
const nodemailer = require("nodemailer");
//Variables de entorno
require("dotenv").config({ path: "../../variable.env" });
//++++++++++++++++++++++++++++++++++++++
const emailMensaje = (valor, fecha, horainicio, horafinal) => {
  //Variables y PASS de EMAIL
  const emailMaster = process.env.CORREO_ELECTRONICO;
  const emailPassword = process.env.PASSWORD_ELECTRONICO;
  //MENSAJE
  const mensaje = `
        Sistema de respaldo de DOCENTES\n
        Fecha : ${fecha}\n
        Hora Inicio : ${horainicio}\n
        Hora Final : ${horafinal}\n
        El sistema de REPOSITORIO registro sus DATOS INGRESADOS\n
        `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${emailMaster}`,
      pass: `${emailPassword}`,
    },
  });
  const mailOptions = {
    from: `${emailMaster}`,
    to: `${valor}`,
    subject: "Asunto Del Correo",
    text: mensaje,
  };
  //
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return false;
    } else {
      return true;
    }
  });
};
module.exports = emailMensaje;
