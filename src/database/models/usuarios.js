module.exports = (sequelize,DataTypes) => {

    let nombre = "usuarios";
    let columnas = {

        "id": {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
		"nombre":{
            type: DataTypes.STRING,
        },
		"apellido":{
            type: DataTypes.STRING,
        },
		"email":{
            type:"" ,
        },
		"telefono":{
            type:"" ,
        } ,
		"fechaDeNacimiento":{
            type: DataTypes.DATE ,
        } ,
		"contraseña":{
            type:"" ,
        } ,
		"Domicilio": {
			"calle":{
                type:"" ,
            } ,
			"codigoPostar":{
                type:"" ,
            } ,
			"Localidad":{
                type:"" ,
            } ,
		},
		"favoritos" : [],
		"ComprasAnteriores" : []
    }

    const usuarios = sequelize.define(nombre,columnas)
    return usuarios;

};