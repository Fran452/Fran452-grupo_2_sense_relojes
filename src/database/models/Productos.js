const database = require("mime-db");

module.exports = (sequelize,dataTypes) => {

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
    };
    let config =  {
        timestamps: false,
        tableName : "Producto"
    };

    const productos = sequelize.define(nombre,columnas,config);

    productos.associate = models => {
        productos.hasMany(models.productImg,{
            foreignKey : 'id_producto',
            as : 'productImg'
        });
        productos.belongsToMany(models.formaDePago,{
            as: 'formaDePago',
            through : 'productos_FormasDePago',
            foreignKey : 'id_producto',
            otherKey: 'id_FormaDePago',
            timestamps : false
            
        });
    }
    return productos;

};








