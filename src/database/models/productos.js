const database = require("mime-db");

module.exports = (sequelize,DataTypes) => {

    let nombre = "productos";
    let columnas = {

        id:{
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            type : dataTypes.INTEGER
        } ,
        nombre:{
            type : dataTypes.STRING(100),
            allowNull: false
        } ,
        detalle : {
            type : dataTypes.STRING(100)
        },
        precio : {
            type : dataTypes.INTEGER,
            allowNull: false
        },
        stock : {
            type : dataTypes.INTEGER
        },
        img : {
            type :dataTypes.STRING(100),
            defaultValue: "default-image.png"
        },
        tipo : {
            type :dataTypes.STRING(100),
            allowNull: false
        },
        show: {
            type :dataTypes.STRING(100)
        },
    }
    let config =  {
        timestamps: false,
        tablename : "Producto"
    }

    const productos = sequelize.define(nombre,columnas,config)
    return productos;

};








