
module.exports = (sequelize,DataTypes) => {

    let nombre = "productos";
    let columnas = {

        id:"" ,
        nombre:"" ,
        tipo: "", 
        img: "",
        precio:"",
        descripcion:"",
        cantidad:"",
        formaDePago:"",
        datosDestacados: "",
        show:"",
    }

    const productos = sequelize.define(nombre)
    return productos;

};








