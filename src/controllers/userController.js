const path = require("path");
const {validationResult} = require("express-validator");
const fs = require ("fs");
const { dirname } = require("path");
const bd = path.join(__dirname, ("../../database"))

// base datos ruta
const controlador = {
    login:(req,res) => {
        res.render("login")
    },

    register:(req,res) => {
        res.render("register")
    },
    newUser : (req,res) => {
        let validaciones = validationResult(req);

        if(validaciones.errors.length > 0){
            return res.render("register",{error:validaciones.mapped()});
        }
        return res.send("usuario validado")
    }
}

function archivoJSON(direccion){
    return JSON.parse(fs.readFileSync(direccion, 'utf-8'));
}

function subirArchivo(direccion,array){
    fs.writeFileSync(direccion,JSON.stringify(array,null,2));
}

function crearID(array){
    return array[array.length - 1].id + 1
}

module.exports = controlador;


