module.exports = (sequelize,DataTypes) => {

    let nombre = "usuarios";
    let columnas = {

        "id": {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
		"nombre":{
            type: DataTypes.STRING(26),
            allowNull: false
        },
		"apellido":{
            type: DataTypes.STRING(26),
            allowNull: false
        },
		"email":{
            type: DataTypes.TEXT() ,
            allowNull: false,
            isEmail: true
        },
		"telefono":{
            type: DataTypes.STRING(6),
        } ,
		"fechaDeNacimiento":{
            type: DataTypes.DATE,
        } ,
		"contraseña":{
            type: DataTypes.TEXT(),
            allowNull: false
        },
        "img" : {
            type: DataTypes.TEXT(),
            allowNull: false
        },
        /*"id_direccion":{
            allowNull: false,
            type : DataTypes.INTEGER
        },*/
        "admin": {
            allowNull: false,
            type : DataTypes.INTEGER
        }
    }

    let config =  {
        timestamps: false,
        tableName : "Usuario"
    };

    const usuarios = sequelize.define(nombre,columnas,config);

    usuarios.associate = (models) => {
        usuarios.hasMany(models.carrito,{
            foreignKey : 'id_usuario',
            as : 'usuarios'
        })
    }

    return usuarios;

};