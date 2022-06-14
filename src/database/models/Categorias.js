module.exports = (sequelize,dataTypes) => {

    let nombre = "categorias";
    let columnas = {
        id:{
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            type : dataTypes.INTEGER
        } ,
        nombre:{
            allowNull: false,
            type : dataTypes.STRING
        },
        img_Baner:{
            allowNull: false,
            type : dataTypes.STRING
        },
        img_Port:{
            allowNull: false,
            type : dataTypes.STRING 
        }
        
    };
    let config =  {
        timestamps: false,
        tableName : "Categoria"
    };
    

    const categorias = sequelize.define(nombre,columnas,config);

    categorias.associate = models => {
        categorias.hasMany(models.productos,{
            foreignKey : 'id_tipo',
            as : 'producto'
        });
    }
    
    return categorias;

};