const path = require("path");
const controlador = {
    index:(req,res) => {res.render("productosGeneral")},
    id:(req,res) => {res.render("productDetail")},
    create: (req,res) => {res.render("agregarProducto")},
}
module.exports = controlador;

