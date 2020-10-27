//Importacion variables de entorno
require('dotenv').config({ path : '../variable.env'});
//Importamos los MODELL
const Admin = require('../modells/administradorModell');
//+++++++++++++++++++++++++++++++++++++++++++
exports.loginAdministrador = async(req, res) => {
    try {
        //Extremos los valores del BODY
        const { user, pass} = req.body;
        //Realizamos el QUERY de busqueda de base de datos
        const peticionLogin = await Admin.findAll({
            where : {
                user : user,
                pass : pass
            },
            raw : true
        })
        if(peticionLogin.length !== 0 ){
            const dateEnd = peticionLogin[0].identificador;
            res.json({ msg : 'correcto', iden  : dateEnd})
        }else{
            res.json({msg : 'incorrecto'})
        }
    } catch (error) {
        res.status(400).json({ msg : 'ERROR DE DATOS RECIBIDOS'})
    }
   
}