const dataBaseSQL = require("../database/models");
const controlador = {
    index: async (req,res) => {
        let productos = await dataBaseSQL.productos.findAll(
            {
                where: {
                    show : 1
                },
                limit: 6,
            }
        );
        let categorias  = await dataBaseSQL.categorias.findAll();
        
        console.log(`estos productos se envian al index : ${productos.map(product => product.dataValues.id)} con estas categorias: ${categorias}`);
        res.render("home.ejs", {productos : productos.map(product => product.dataValues), categorias : categorias.map(categoria => categoria.dataValues)});
    },
    carrito:(req,res) => {res.render("carrito")},
}

module.exports = controlador;