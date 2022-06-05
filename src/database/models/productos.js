
module.exports = (sequelize,DataTypes) => {

    let nombre = "productos";
    let columnas = {

        id:{} ,
        nombre:{} ,
        detalle : {},
        precio : {},
        stock : {},
        img : {},
        tipo : {},
        show: {},
    }
    let config =  {}

    const productos = sequelize.define(nombre,columnas,config)
    return productos;

};








