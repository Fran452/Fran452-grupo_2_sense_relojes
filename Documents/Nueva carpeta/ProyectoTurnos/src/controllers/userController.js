const path = require("path");
const {validationResult} = require("express-validator");
const baseDeDatos = require("../database/models");

const controlador = {
    login:(req,res) => {
        res.render("login")
    },
    register:(req,res) => {
        res.render("register")
    },
    add:function (req,res) {
        res.render("register")
    },
    create:function (req,res) {
        baseDeDatos.users.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            created_at:req.body.created_at,
            updated_at:req.body.updated_at
        });
        res.redirect("/VistaTurnos");
        
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
