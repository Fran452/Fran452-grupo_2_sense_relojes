const fs = require("fs");
const path = require("path");
const logs = path.join(__dirname,"logs.txt");
console.log(logs);
/** 
 * @desc Trae un archivo JSON a objetos para utilizar en js
 * @param {string} direccion 
 * @returns {object}
*/
function archivoJSON(direccion){
    return JSON.parse(fs.readFileSync(direccion, 'utf-8'));
}
/**
 * @desc sube un array a un archivo JSON que pasemos por la direccion
 * @param {string} direccion 
 * @param {array} array
 * @return {void}  
*/
function subirArchivo(direccion,array){
	fs.writeFileSync(direccion,JSON.stringify(array,null,2));
}

function crearID(array){
	return array[array.length - 1].id + 1
}
/**
 * @desc Elimina un archivo de la ruta enviada por parámetros
 * @param {string} direccion ruta absoluta del archivo a eliminar
 * @returns {void}
*/
function eliminarArchivo(direccion){
	fs.unlinkSync(direccion)
}

function newLog(log){
	fs.appendFile(logs,log, () => {});
}


module.exports = {archivoJSON ,subirArchivo,crearID,eliminarArchivo,newLog};
