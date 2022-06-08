module.exports = (sequelize,dataTypes) => {

    let nombre = "productImg";
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
        tableName : "ProductImg"
    };
    
    const productImg = sequelize.define(nombre,columnas,config);

    productImg.associate = models => {
        productImg.belongsTo(models.productos,{
            foreignKey : 'id_producto',
            as : 'productos'
        })
    }
    return productImg;

};