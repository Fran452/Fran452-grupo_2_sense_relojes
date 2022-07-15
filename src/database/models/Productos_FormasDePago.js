module.exports = (sequelize,dataTypes) => {

    let nombre = "productos_FormasDePago";
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
        id_formaDePago:{
            allowNull: false,
            type : dataTypes.INTEGER
        }
        
    };
    let config =  {
        timestamps: false,
        tableName : "Productos_FormasDePago"
    };
    
    const productos_FormasDePago = sequelize.define(nombre,columnas,config);

    
    return productos_FormasDePago;

};