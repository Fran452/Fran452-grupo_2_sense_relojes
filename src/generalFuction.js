const fs = require("fs");
const path = require("path");

function archivoJSON(direccion){
    return JSON.parse(fs.readFileSync(direccion, 'utf-8'));
}

function subirArchivo(direccion,array){
	fs.writeFileSync(direccion,JSON.stringify(array,null,2));
}

function crearID(array){
	return array[array.length - 1].id + 1
}


module.exports = {archivoJSON ,subirArchivo,ordenarSegundID,crearID};