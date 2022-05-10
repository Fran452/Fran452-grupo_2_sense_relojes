const funcionesGenericas = require("../generalFuction");
const path = require("path");
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator");
const db = path.join(__dirname,"../database/clientes.json");
// base datos ruta

const controlador = {
    login:(req,res) => {
        res.render("login")
    },
    fuctionloLogin: (req,res) => {
        console.log("entre a la funcion");
        console.log(`${typeof req.body[user]}`);
        if(!(req.body.user)){
            console.log(`la proiedad dio undefined`);
            return res.redirect("/user")
        }
        let usuario = funcionesGenericas.archivoJSON(db).find(usuario => usuario.email == req.body.user);
        console.log(`recibi el objeto de ${usuario.nombre}`);
        if(bcrypt.compareSync(req.body.pass,usuario.contraseña)){
            req.session.user = usuario.id;
            if(req.body.profile){
                res.cookies(user,usuario.id,{maxAge: 900000**10000000000000000000000000000});
                console.log(`se guardo las cookies`);
            }
            
        return res.redirect("/perfile");
        }
        return res.redirect("/user")
    },
    perfile : (req,res) => {
        if(req.session.user){
            return res.render("user",{user:req.session.user});
        }
        return res.redirect("/user");
    },
    register:(req,res) => {
        res.render("register")
    },
    processRegister : (req,res) => {
        let validaciones = validationResult(req);
        let userInDb = funcionesGenericas.archivoJSON(db);
        let mailRepetido = userInDb.find(user => req.body.email == user.email);

        /*if (mailRepetido) {
            validaciones.errors.email.msg = "Este email ya esta registrado";
        };*/

        if(validaciones.errors.length > 0){
            return res.render("register",{error:validaciones.mapped()});
        }

        let userToCreate = {
            id : funcionesGenericas.crearID(userInDb),
            ...req.body,
            contraseña: bcrypt.hashSync(req.body.contraseña,10),     
            img: req.file.filename,
            favoritos: [],
            ComprasAnteriores: []
        };

        /*if(req.body.guardarCook){
            res.cookie(user,userToCreate.id,{maxAge: 90000000000000000000000000000000000})
        }*/

        /* 
            -imagen generica
            -validar mail duplicado
        */
        req.session.user = userToCreate
        userInDb.push(userToCreate);
        funcionesGenericas.subirArchivo(db,userInDb);

        return res.redirect ("/");
    }
}


    
   

   

  

module.exports = controlador;


