const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

function archivoJSON(direccion){
    return JSON.parse(fs.readFileSync(direccion, 'utf-8'));
}

function subirArchivo(direccion,array){
	fs.writeFileSync(direccion,JSON.stringify(array,null,2));
}

function crearID(array){
	return array[array.length - 1].id + 1
}
/*
 * @desc Elimina un archivo de la ruta enviada por parámetros
 * @param {string} direccion ruta absoluta del archivo a eliminar
 * @returns {void}
 */
function eliminarArchivo(direccion){
	fs.unlinkSync(direccion)
}


module.exports = {archivoJSON ,subirArchivo,crearID,eliminarArchivo};