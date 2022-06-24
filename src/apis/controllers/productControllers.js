const dataBaseSQL = require("../../database/models");
const sequelize = require("sequelize")
const { QueryTypes } = require('sequelize');

const controlador = {
    index : async (req,res) => {
        let count = await dataBaseSQL.productos.findAll();
        let countByCategory = await sequelize.query('SELECT COUNT(*) FROM `Producto` GROUP By "tipo";');
        let products= await dataBaseSQL.productos.findAll();
        count = count.length
        res.json({count, products})
    },

    detalle : async (req,res) => {

    }

}

module.exports = controlador;
