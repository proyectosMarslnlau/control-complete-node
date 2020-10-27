//Importamos la svarables de entorno
require('dotenv').config({ path  : '../variable.env'});
//Improtmaos la libreria de EXCEL
const readXlsxFile = require('read-excel-file/node');
//Improtamos el MODELL 
const Login = require('../modells/loginModell');
const Docente = require('../modells/docenteModell');
//
const fs = require('fs')
//++++++++++++++++++++++++++++++++++
exports.uplaodFile = async(req, res) => {
    try {
        
        let path = './public/files/libro-unico.xlsx'
        readXlsxFile(path).then((rows) => {
            // skip header
            rows.shift();
            let tutorials = [];
            let materias = [];
            
            //Desarrollamos el forEach de los titulos
            rows.forEach((row) => {
              let tutorial = {
                nombre: row[0],
                usuario: row[1],
                password: row[2],
                carnet: row[3],
                tipo: row[4],
                email: row[5],
              };
              tutorials.push(tutorial);
            });

            rows.forEach((row) => {

                if(row[6] !== null){
                    let materia = {
                        carnet : row[3],
                        sigla : row[6],
                        materia : row[7]
                    }
                    materias.push(materia);
                }
                if(row[8] !== null){
                    let materia = {
                        carnet : row[3],
                        sigla : row[8],
                        materia : row[9]
                    }
                    materias.push(materia);
                    
                }
                if(row[10] !== null){
                    let materia = {
                        carnet : row[3],
                        sigla : row[10],
                        materia : row[11]
                    }
                    materias.push(materia);
                    
                }
                if(row[12] !== null){
                    let materia = {
                        carnet : row[3],
                        sigla : row[12],
                        materia : row[13]
                    }
                    materias.push(materia);
                }
                if(row[14] !== null){
                    let materia = {
                        carnet : row[3],
                        sigla : row[14],
                        materia : row[15]
                    }
                    materias.push(materia);
                }
              });
             
            const guardarDatos = Login.bulkCreate(tutorials);
            const guardarMaterias = Docente.bulkCreate(materias);
            if(guardarDatos && guardarMaterias){
                fs.unlinkSync(path);
                res.json({ msg : 'correcto'});
            }else{
                res.json({ msg : 'incorrecto'});
            }
        });
        
    } catch (error) {
        res.status(400).json({ msg : 'HUBO UN ERROR INTENTE MAS TARDE'})
    }
}