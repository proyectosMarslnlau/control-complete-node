//Importmaos las variables de entorno
require("dotenv").config({ path: "../variable.env" });
//Importamos los modelos
const LoginModell = require("../modells/loginModell");
//-----------------------------------------------
exports.loginUser = async (req, res) => {
  //Verificamos todos los errores posibles errores
  try {
    const { user, pass } = req.body;
    //Realizamos la consulta si existen usuarios
    const userDate = await LoginModell.findAll({
      where: { usuario: user, password: pass },
    });
    if (userDate.length === 0) {
      res.json({ msg : []});
    } else {
      res.json({ msg: userDate });
    }
  } catch (error) {
    res.status(400).json({ msg: "ERROR DE ROUTA" });
  }
};
