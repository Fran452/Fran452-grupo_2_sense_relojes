module.exports = (sequelize,dataTypes) => {

    let nombre = "formaDePago";
    let columnas = {
        id:{
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            type : dataTypes.INTEGER
        } ,
        FormaDePago:{
            allowNull: false,
            type : dataTypes.STRING
        } ,
        
    };
    let config =  {
        timestamps: false,
        tableName : "FormasDePago"
    };
    
    const formaDePago = sequelize.define(nombre,columnas,config);

    /*
    formaDePago.associate = models => {    
        formaDePago.belongsToMany(models.Productos,{
            as: 'productos',
            through : 'productos_FormasDePago',
            foreignKey : 'id_FormaDePago',
            otherKey: 'id_producto',
            timestamps : false
            
        })
    };*/
    return formaDePago;

};