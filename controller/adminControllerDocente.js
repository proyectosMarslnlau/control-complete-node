//Importamos las variables de entorno
require('dotenv').config({ path : '../variable.env'});
//Importmaos el MODELL
const Login = require('../modells/loginModell');
const Docente = require('../modells/docenteModell');
//++++++++++++++++++++++++++++++++++++++++++
exports.docenteAdministrador = async(req, res) => {
    
    try {
        const peticionDocente = await Login.findAll(
            {raw : true}
        )
        if(peticionDocente.length !== 0 ){
            res.json({msg : 'correcto', response : peticionDocente})
        }else{
            res.json({msg : 'incorrecto'})
        }
    } catch (error) {
        res.status(400).json({ msg : 'ERROR DE SALIDA'})
    }
}

exports.docenteMateriasAdministrador = async(req, res) => {
    try {
        const {carnet} = req.body;
        const materiaDocente = await Docente.findAll({
            where : {
                carnet : carnet
            },
            raw  : true
        });
        if(materiaDocente.length !== 0){
            res.json({ msg : 'correcto', response : materiaDocente})
        }else{
            res.json({ msg : 'incorrecto'})
        }
        
    } catch (error) {
        res.status(400).json({ msg : 'ERROR INTENTE MAS TARDE'})
    }
}
exports.docenteMateriaAnadirMateria = async(req, res) => {
    try {
        const {carnet, sigla, materia } = req.body;
        const peticionCrear = await Docente.create({
            carnet : carnet,
            sigla : sigla,
            materia : materia
        })
        if(peticionCrear){
            res.json({ msg : 'correcto'})
        }else{
            res.json({ msg : 'incorrecto'})
        }
    } catch (error) {
        res.status(400).json({ msg : 'HUO UN ERROR INTENTE MAS TARDE'})
    }
}

exports.docenteBorrarMateria = async(req, res) => {
    try {
        const {carnet, sigla, materia} = req.body;
        const peticionBorrar = await Docente.destroy({  
            where : {
                carnet : carnet,
                sigla : sigla,
                materia : materia
            }
        })
        //
        if( peticionBorrar){
            res.json({ msg : 'correcto'})
        }else{
            res.json({ msg : 'incorrecto'})
        }
    } catch (error) {
        res.status(400).json({ msg : 'HUBO UN ERROR INTENTE MAS TARDE'})
    }
}

exports.docenteFichaTecnica = async(req, res) => {
    try {
        const {nombre, usuario, password, carnet, tipo, email} = req.body.datos;
        const  peticionUpdate = await Login.update({
            nombre : nombre,
            usuario : usuario,
            password : password,
            tipo : tipo,
            email : email
        },{
            where : { carnet : carnet}
        });
        //
        if(peticionUpdate){
            res.json({ msg : 'correcto'})
        }else{
            res.json({ msg : 'incorrecto'})
        }
    } catch (error) {
        res.status(400).json({ msg : 'HUBO UN PROBLEMA INTENTE MAS TARDE'})
    }
}

exports.docenteNuevo = async(req, res) => {
    try {
        console.log(req.body);
        const {nombre, usuario, password, tipo, email}= req.body.datos;
        const peticionNew = await Login.create({
            nombre : nombre,
            usuario : usuario,
            password : password,
            carnet : password,
            tipo : tipo,
            email : email
        });
        //
        if( peticionNew){
            res.json({ msg : 'correcto'})
        }else{
            res.json({ msg : 'incorrecto'})
        }
    } catch (error) {
        res.status(400).json('HUBO UN ERROR INTENTE MAS TARDE')
    }
}   

exports.docenteBorrar = async(req, res) => {
    try {
        const {carnet} = req.body;
        const peticionBorrarDocente = await Login.destroy({  
            where : {
                carnet : carnet,
            }
        });
        const peticionBorrarDocenteMateria =await Docente.destroy({
            where : {
                carnet : carnet
            }
        })
        if( peticionBorrarDocente || peticionBorrarDocenteMateria){
            res.json({ msg : 'correcto'})
        }else{
            res.json({ msg : 'incorrecto'})
        }
    } catch (error) {
        res.status(400).json({ msg : 'HUBO UN ERROR INTENTE MAS TARDE'})
    }
}