//Importamos variables de entorno
require('dotenv').config({ path : '../variable.env'});
//Imoprtamos el MODELL
const Plataforma = require('../modells/plataformModell');
//+++++++++++++++++++++++++++++++++++++++++
//
exports.anadirPlataform = async(req, res) => {
    try {
        const { plataforma } = req.body;
        const peticionCrear = await Plataforma.create({
            plataforma : plataforma
        })
        if( peticionCrear){
            res.json({ msg : 'correcto'})
        }else{
            res.json({ msg : 'incorrecto'})
        }
    } catch (error) {
        res.status(400).json({ msg : 'HUBO UN PROBLEMA INTENTE MAS TARDE'})
    }
}
//
exports.listarPlataform = async(req, res) => {
    try {
        const peticionLista = await Plataforma.findAll();
        
        if( peticionLista.length !== 0 ){
            res.json({ msg : 'correcto', response : peticionLista});
        }else{
            res.json({ msg : 'incorrecto'});
        }
    } catch (error) {
        res.status(400).json({ msg : 'HUBO UN PROBLEMA INTENTE MAS TARDE'})
    }
}
exports.borrarPlataforma = async(req, res) => {
    try {
        const {plataforma} = req.body;
        const peticionBorrar = await Plataforma.destroy({
            where : {
                plataforma : plataforma
            }
        })
        if(peticionBorrar){
            res.json({ msg : 'correcto'})
        }else{
            res.json({ msg : 'incorrecto'})
        }
    } catch (error) {
        res.status(400).json({ msg :'HUBO UN PROBLEMA INTENTE MAS TARDE'})
    }
}