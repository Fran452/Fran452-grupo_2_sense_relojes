module.exports = (sequelize,DataTypes) => {

    let nombre = "productosImg";
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
        img : {
            type : dataTypes.STRING(100)
        },
        
    };
    let config =  {
        timestamps: false,
        tablename : "ProductImg"
    };
    
    const productosImg = sequelize.define(nombre,columnas,config);

    productosImg.associate = models => {
        productosImg.belongTo(models.productos,{
            foreingKey : 'id_producto',
            as : 'productos'
        })
    }
    return productosImg;

};