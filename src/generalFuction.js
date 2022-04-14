const fs = require("fs");
const path = require("path");

function archivoJSON(direccion){
    return JSON.parse(fs.readFileSync(direccion, 'utf-8'));
}

function subirArchivo(direccion,array){
	fs.writeFileSync(direccion,JSON.stringify(array,null,2));
}

function ordenarSegundID(array){
	return array.sort((a,b)=> a.id - b.id)
}

function crearID(array){
	if(array[0].id != 1){
		return 1;
	}
	for(let i = 0 ; i < array.length; i++){
		if(array[i+1]!= undefined){
			if(array[i].id + 1 !=  array[i+1].id){
				return array[i].id + 1;
			}
		}
	}
	return array[array.length - 1].id + 1;
}



module.exports = {archivoJSON ,subirArchivo,ordenarSegundID,crearID};