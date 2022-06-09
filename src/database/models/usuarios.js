module.exports = (sequelize,DataTypes) => {

    let nombre = "usuarios";
    let columnas = {

        "id": {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
		"nombre":{
            type: DataTypes.varchar(26),
            allowNull: false
        },
		"apellido":{
            type: DataTypes.varchar(26),
            allowNull: false
        },
		"email":{
            type: DataTypes.varchar(26) ,
            allowNull: false,
            isEmail: true
        },
		"telefono":{
            type: DataTypes.smallint(6),
        } ,
		"fechaDeNacimiento":{
            type: DataTypes.DATE,
        } ,
		"contraseña":{
            type: DataTypes.varchar(26),
            allowNull: false
        }
    }

    const usuarios = sequelize.define(nombre,columnas)
    return usuarios;

};