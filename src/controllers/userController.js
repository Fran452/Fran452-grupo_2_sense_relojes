const path = require("path");
const {validationResult} = require("express-validator");
const fs = require ("fs");
const bcrypts = require ("bcryptjs");

const db = path.join(__dirname,"../database/user.json");
const functionGeneric = require ("generalFuction.js");
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
        let userInDb = funcionesGenerales.archivoJSON(db);
        let mailRepetido = userInDb.find(user => req.body.email == user.email);

        if (mailRepetido) {
                validaciones.errors.email.msg = "Este email ya esta registrado";
        };

        if(validaciones.errors.length > 0){
            return res.render("register",{error:validaciones.mapped()});
        }

        let userToCreate = {
            id : functionGeneric.crearID(userInDb),
            ...req.body,
            constraseña: bcrypts.hashSync(req.body.constraseña,10),     
            img: req.file.filename
        };

        //conecta con funcion login
        if(req.body.guardarCook){
            res.cookie(user,userToCreate.id,{maxAge: 90000000000000000000000000000000000})
        }
        req.session.user = userToCreate
        userInDb.push(userToCreate);
        funcionesGenerales.subirArchiv(db,userInDb);

        return res.redirect ("/home");
    }
}


    
   

   

  

module.exports = controlador;


