//Importamos las variables de entorno
require('dotenv').config({ msg : '../variable.env'});
//Importamos los modelos
const Datos = require('../modells/datosModell');
const Login = require('../modells/loginModell');
//
const excel = require("exceljs");
//
const pdf = require('html-pdf');
//++++++++++++++++++++++++++++++++++++++++++
exports.listarInformacion = async(req, res) => {
    try {
        const peticionListarDatos = await Login.findAll({
            raw : true
        });
        if(peticionListarDatos.length !== 0 ){
            res.json({ msg : 'correcto', response : peticionListarDatos});
        }else{
            res.json({ msg : 'incorrecto'})
        }
    } catch (error) {
        res.status(400).json({ msg:'HUBO UN ERROR INTENTE MAS TARDE'})
    }
}

exports.listarDatosDocente = async(req, res) => {
    try {
        const { carnet} = req.body;
        const peticionListarDatosDocente = await Datos.findAll({
            where : {
                carnet : carnet
            }
        })
        if(peticionListarDatosDocente.length !== 0){
            res.json({ msg : 'correcto', response : peticionListarDatosDocente})
        }else{
            res.json({ msg : 'incorrecto'})
        }
    } catch (error) {
        res.status(400).json({ msg : 'HUBO UN ERROR INTENTE MAS TARDE'})
    }
}

exports.descargarDocumento = async(req, res) => {
    Datos.findAll().then((objs) => {
        let tutorials = [];
    
        objs.forEach((obj) => {
          tutorials.push({
            id: obj.id,
            carnet: obj.carnet,
            materia: obj.materia,
            titulo: obj.titulo,
          });
        });
    
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("Tutorials");
        const columnsStyle = { font: { name: 'Arial Black', size: 12 } };
        worksheet.columns = [
          { header: "Id", key: "id", width: 5 },
          { header: "Title", key: "carnet", width: 25 },
          { header: "Description", key: "materia", width: 25 },
          { header: "Published", key: "titulo", width: 10, style: columnsStyle },
        ];
        
        // Add Array Rows
        worksheet.addRows(tutorials);
    
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + "tutorials.xlsx"
        );
        workbook.xlsx.writeFile('Project.xlsx');
        /*
        return workbook.xlsx.write(res).then(function () {
          res.status(200).end();
        });*/
      });
}
//
exports.verificarInformacionFecha = async(req,res) => {
    try {
        const { carnet, mes, anio } = req.body.datos;
        
        let datos = []
        //
        const peticionNombre = await Login.findAll({
            where : {
                carnet : carnet 
            },
            attributes: ['nombre'],
            raw : true
        });
        const nombreCarnet = peticionNombre[0].nombre;
        
        //
        const peticionDatos = await Datos.findAll({
            where : {
                carnet : carnet
            },
            attributes: ['id', 'materia', 'titulo', 'cantidad','fecha', 'horaini', 'horafin', 'plataforma', 'avance', 'observacion'],
            raw : true
        })
        //
        peticionDatos.map( item => {
            const variable = item.fecha.split('/');
            if( mes === variable[1] && anio === variable[2]){
                item.nombre = nombreCarnet;
                datos.push(item);
            }
        })

        if( datos.length !== 0){
            res.json({ msg: 'correcto'})
        }else{
            res.json({ msg : 'incorrecto'})
        }
    } catch (error) {
        res.status(400).json({ msg : 'HUBO UN ERROR INTENTE MAS TARDE'})
    }
}
//
exports.descargarArchivoExcel = async( req, res) => {
    try {
        //const { carnet, mes, anio } = req.query.datos;
        const carnet = req.query.carnet;
        const mes = req.query.mes;
        const anio = req.query.anio;
        let datos = []
        //
        const peticionNombre = await Login.findAll({
            where : {
                carnet : carnet 
            },
            attributes: ['nombre'],
            raw : true
        });
        const nombreCarnet = peticionNombre[0].nombre;
        //
        const peticionDatos = await Datos.findAll({
            where : {
                carnet : carnet
            },
            attributes: ['id', 'materia', 'titulo', 'cantidad','fecha', 'horaini', 'horafin', 'plataforma', 'avance', 'observacion'],
            raw : true
        })
        //
        peticionDatos.map( item => {
            const variable = item.fecha.split('/');
            if( mes === variable[1] && anio === variable[2]){
                item.nombre = nombreCarnet;
                datos.push(item);
            }
        })

        let workbook = new excel.Workbook();
        //Nombre de la hoja a Crear
        let worksheet = workbook.addWorksheet(`Docente ${nombreCarnet}`);
        //Estilos de Columna
        const columnsStyle = { font: { name: 'Arial', size: 11 } };
        //Estilos de la primera FILA
        ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1'].map(key => {
            worksheet.getCell(key).fill = {
                type: 'pattern',
                pattern:'solid',
                fgColor:{ argb:'ffffb7' },
            };
            worksheet.getCell(key).font = {
                name: 'Arial',
                family: 4,
                size: 12,
                underline: false,
                bold: true
            }
        });
        
        //Columnas de usuario
        worksheet.columns = [
            { header: "Id", key: "id", width: 5 },
            { header: "Nombre", key: "nombre", width: 25, style : columnsStyle },
            { header: "Materia", key: "materia", width: 25, style : columnsStyle },
            { header: "Titulo", key: "titulo", width: 25, style : columnsStyle },
            { header: "Cantidad", key: "cantidad", width: 15, style : columnsStyle },
            { header: "Fecha", key: "fecha", width: 15, style : columnsStyle },
            { header: "Hora Inicial", key: "horaini", width: 15, style : columnsStyle },
            { header: "Hora Final", key: "horafin", width: 15, style : columnsStyle },
            { header: "Plataforma", key: "plataforma", width: 15, style : columnsStyle },
            { header: "Avance", key: "avance", width: 15, style : columnsStyle },
            { header: "Observacion", key: "observacion", width: 15, style : columnsStyle },
            
          ];
          //Implementacion de Stilos de las demas columnas
          [1,2,3,4,5,6,7,8,9,10,11,12].map(key => {
            worksheet.getColumn(key).alignment = 
                { 
                    vertical: 'middle', 
                    wrapText: true 
                };
            });
          // Add Array Rows
          worksheet.addRows(datos);
          
          res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "informe.xlsx"
          );
          //workbook.xlsx.writeFile('Project.xlsx');
          return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
          });
        
    } catch (error) {
        res.status(400).json({ msg : 'HUBO UN ERROR INTENTE MAS TARDE'})
    }
}   
//
exports.documentoPDF = async(req, res) => {
    try {
        const carnet = req.query.carnet;
        const mes = req.query.mes;
        const anio = req.query.anio;
        let datos = []
        //
        const peticionNombre = await Login.findAll({
            where : {
                carnet : carnet 
            },
            attributes: ['nombre'],
            raw : true
        });
        const nombreCarnet = peticionNombre[0].nombre;
        //
        const peticionDatos = await Datos.findAll({
            where : {
                carnet : carnet
            },
            attributes: ['id', 'materia', 'titulo', 'cantidad','fecha', 'horaini', 'horafin', 'plataforma', 'avance', 'observacion', 'foto'],
            raw : true
        })
        //
        peticionDatos.map( item => {
            const variable = item.fecha.split('/');
            if( mes === variable[1] && anio === variable[2]){
                item.nombre = nombreCarnet;
                datos.push(item);
            }
        });
        console.log(datos)
//
        if(datos.length !== 0 ){
            const content = `
                <!doctype html>
                <html>
                <!-- Compiled and minified CSS -->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            
                <!-- Compiled and minified JavaScript -->
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
                <head>
                    <meta charset="utf-8">
                    <title>PDF Result Template</title>
                    <style>
                        .contenedor {
                            margin-top: 3em;
                        }
                        .imagen {
                            width: 300px;
                        }
                    </style>
                    </head>
                    <body>
                        <div class="container contenedor">
                            <div class="row">
                                <h4>Informe Docente de fecha : </h4>
                                <h5>Informe de procedencia de Materias.</h5>
                            </div>
                            ${ datos.map( item => (
                                `<div class="row">
                                    <p>------------s</p>
                                    <div class="col s6">
                                        <p>Nombre : ${item.nombre}</p>
                                        <p>Materia : ${item.materia}</p>
                                        <p>Titulo : ${item.titulo}</p>
                                        <p>Cantidad : ${item.cantidad}</p>
                                        <p>Fecha : ${item.fecha}</p>
                                        <p>Hora Inicial : ${item.horaini}</p>
                                        <p>Hora Final : ${item.horafin}</p>
                                        <p>Plataforma : ${item.plataforma}</p>
                                        <p>Avance : ${item.avance}</p>
                                        <p>Obervacion : ${item.observacion}</p>
                                        <p>Obervacion : ${item.foto}</p>

                                    </div>
                                    <div class="col s6">
                                        1
                                    </div>
                                </div>`
                            ))}
                            
                        </div>
                    </body>
                </html>
            `
            pdf.create(content).toFile('./public/files/informe-docente.pdf', function(err, res) {
                if (err){
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
            res.json({ msg : 'correcto'})
        }else{
            res.json({ msg : 'incorrecto'})
        }
        
    } catch (error) {
        res.status(400).json({ msg : 'HUBO UN ERROR INTENTE MAS TARDE'})
    }
}