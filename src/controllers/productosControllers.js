const path = require("path");
const controlador = {
    index:(req,res) => {res.render(path.join(__dirname,"../views/productosGeneral.ejs"))},
    id:(req,res) => {res.render(path.join(__dirname,"../views/productDetail.ejs"))},
    create: "para ingresar datos para la creacion de un produto"
}
module.exports = controlador;

