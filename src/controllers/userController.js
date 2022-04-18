const path = require("path");
const {validationResult} = require("express-validator");

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

module.exports = controlador;
