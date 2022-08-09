const path = require("path");
const controlador = {
    index:(req,res) => {res.render("home.ejs")},
    carrito:(req,res) => {res.render("carrito")},
}

module.exports = controlador;