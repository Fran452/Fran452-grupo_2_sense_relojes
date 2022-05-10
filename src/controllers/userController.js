const path = require("path");
const {validationResult} = require("express-validator");
const fs = require ("fs");
const { dirname } = require("path");
const bd = path.join(__dirname, ("../../database"))
const bcrypts = require ("bcryptjs")

// base datos ruta
const controlador = {
    login:(req,res) => {
        res.render("login")
    },

    register:(req,res) => {
        res.render("register")
    },
    processRegister : (req,res) => {
        let validaciones = validationResult(req);

        if(validaciones.errors.length > 0){
            return res.render("register",{error:validaciones.mapped()});
        }
        return res.send("usuario validado")},
    };

    // // Mensaje por email duplicado
    // let userInDb = user.findByField("email",req.body.email);
    // if (userInDb) {
    //     return res.render("user register form"),{
    //         errors: {
    //             email: {msg: "Este email ya esta registrado" }},
    //     }
    // };

    // let userToCreate = {
    //     ...req.body,
    //     constraseña: bcrypts.hashSync(req.body.constraseña,10)   
    //     // imagen: req.file.filename
    // };

    // // conecta con funcion login
    // let usuarioCreado = User.create (userToCreate); 
    // return res.redirect ("/views/login")

    
   

   

  

module.exports = controlador;


