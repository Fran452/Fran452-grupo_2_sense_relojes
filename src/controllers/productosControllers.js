const path = require("path");
const controlador = {
    index:(req,res) => {res.render("productosGeneral")},
    id:(req,res) => {res.render("roductDetail")},
    create: "para ingresar datos para la creacion de un produto"
}
module.exports = controlador;

