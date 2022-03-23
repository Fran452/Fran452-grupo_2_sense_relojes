const path = require("path");
const controlador = {
    index:(req,res) => {res.render(path.join(__dirname,"../views/home.ejs"))},
    carrito:(req,res) => {res.render(path.join(__dirname,"../views/carrito.ejs"))},
}

module.exports = controlador;