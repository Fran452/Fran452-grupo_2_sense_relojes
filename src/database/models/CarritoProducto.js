module.exports = (sequelize,dataTypes) => {

    let nombre = "carritoProducto";
    let columnas = {
        id:{
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            type : dataTypes.INTEGER
        } ,
        id_producto:{
            allowNull: false,
            type : dataTypes.INTEGER
        } ,
        id_carrito : {
            allowNull: false,
            type : dataTypes.INTEGER
        },
        cantidad : {
            allowNull: false,
            type : dataTypes.INTEGER
        }
        
    };
    let config =  {
        timestamps: false,
        tableName : "CarritoProducto"
    };
    
    const carritoProducto = sequelize.define(nombre,columnas,config);

    return carritoProducto;

};
