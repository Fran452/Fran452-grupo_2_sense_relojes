const baseDeDatos = require("../database/models")
const path = require ("path");
const controlador = {
    index:(req,res) => {res.render("home.ejs")},
}

module.exports = controlador;