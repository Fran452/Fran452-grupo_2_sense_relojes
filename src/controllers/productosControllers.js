const path = require("path");
const controlador = {
    index:(req,res) => {res.sendFile(path.join(__dirname,"./views/productosGeneral.html"))},
    id:(req,res) => {res.sendFile(path.join(__dirname,"./views/productDetail.html"))},
    create: "para ingresar datos para la creacion de un produto"
}
module.exports = controlador;

