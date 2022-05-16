const path = require("path");
const controlador = {
    login:(req,res) => {res.render("login")},
    register:(req,res) => {res.render("register")},
    paginausuario:(req,res) => {res.render("paginausuario")},
    id:(req,res) => {
        let productoSeleccionado = fuctionGeneric.archivoJSON(dataBase).find(producto => producto.id == req.params.id)
        res.render("paginausuario",{producto:productoSeleccionado, productRecomiend : fuctionGeneric.archivoJSON(dataBase)})
    }
}


module.exports = controlador;