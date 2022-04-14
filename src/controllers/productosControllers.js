const path = require("path");
const controlador = {
    index:(req,res) => {res.render("productosGeneral")},
    id:(req,res) => {res.render("productDetail")},
    create: (req,res) => {res.render("agregarProducto")},
    editProduct: (req,res) => {res.render("modificarproducto")},
    deleteProduct: (req,res) => {res.render("eliminarproducto")}
}
module.exports = controlador;

