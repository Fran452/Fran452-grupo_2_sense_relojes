const dataBaseSQL = require("../../database/models");
const sequelize = require("sequelize")
const { QueryTypes } = require('sequelize');

const controlador = {
    index : async (req,res) => {
        let count = await dataBaseSQL.productos.findAll();
        let countByCategory = await dataBaseSQL.sequelize.query('SELECT COUNT(*) FROM `Producto` GROUP By "tipo";');
        let products= await dataBaseSQL.productos.findAll();
        count = count.length
        res.json({count, products,countByCategory})
    },

    detalle : async (req,res) => {
        let producto = await dataBaseSQL.productos.findByPk(req.params.id,{include : [{association : "productImg"},{association : "formaDePago"}]});
        console.log(producto);
        res.json(producto);
    }

}

module.exports = controlador;
