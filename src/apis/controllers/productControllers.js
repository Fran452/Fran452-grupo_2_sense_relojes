const dataBaseSQL = require("../../database/models");

const controlador = {
    index : async (req,res) => {
        let count = await dataBaseSQL.productos.findAll();
        let countByCategory = await dataBaseSQL.sequelize.query('SELECT id_tipo,COUNT(*) FROM `Producto` GROUP By id_tipo;');
        let products= await dataBaseSQL.productos.findAll();
        count = count.length;
        countByCategory = countByCategory[0];

        res.json({count, products,countByCategory});
    },

    detalle : async (req,res) => {
        let producto = await dataBaseSQL.productos.findByPk(req.params.id,{include : [{association : "productImg"},{association : "formaDePago"},{association : "categorias"}]});
        console.log(producto);
        let urlImg = `http://localhost:3000/img/product/${producto.img}`
        producto ={
            ...producto.dataValues,
            urlImg
        }
        res.json(producto);
    }

}

module.exports = controlador;
