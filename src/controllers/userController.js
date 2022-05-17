const funcionesGenericas = require("../generalFuction");
const path = require("path");
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator");
const { fstat } = require("fs");
const db = path.join(__dirname,"../database/clientes.json");
// base datos ruta

const controlador = {
    login:(req,res) => {
        res.render("login")
    },
    fuctionLogin: (req,res) => {
        if(!(req.body.user)){
            console.log(`la proiedad dio undefined`);
            return res.redirect("/user")
        }
        let usuario = funcionesGenericas.archivoJSON(db).find(usuario => usuario.email == req.body.user);
        console.log(`recibi el objeto de ${usuario.nombre}`);
        if(bcrypt.compareSync(req.body.pass,usuario.contraseña)){
            req.session.user = usuario;
            if(req.body.profile){
                res.cookie("user",req.session.user.id,{ expires: new Date(Date.now() + (30*24*3600000)) }); // no funca las cookies
                console.log(`se guardo las cookies`);
            }
            
        return res.redirect("/user/perfile");
        }
        return res.redirect("/user")
    },
    perfile : (req,res) => {
        if(req.session.user){
            return res.render("perfile",{user:req.session.user});
        }
        return res.redirect("/user");
    },
    register:(req,res) => {
        res.render("register")
    },
    processRegister : (req,res) => {
        let validaciones = validationResult(req);
        let userInDb = funcionesGenericas.archivoJSON(db);
        let img = req.files?.filename ? req.files.filename : "default-image.png";
        if(validaciones.errors.length > 0){
            console.log("entre al error");
            if(img != "default-image.png"){
                funcionesGenericas.eliminarArchivo(path.join(__dirname,"../../public/img/user",img))
            }
            return res.render("register",{error:validaciones.mapped()});
        }
        let userToCreate = {
            id : funcionesGenericas.crearID(userInDb),
            ...req.body,
            contraseña: bcrypt.hashSync(req.body.contraseña,10),     
            img: img,
            favoritos: [],
            ComprasAnteriores: []
        };
        if(req.body.guardarCook){
            res.cookie(user,userToCreate.id,{maxAge: new Date(Date.now() + (30*24*3600000))})
        }
        req.session.user = userToCreate
        userInDb.push(userToCreate);
        funcionesGenericas.subirArchivo(db,userInDb);
        return res.redirect ("/user/perfile");
    }
}

module.exports = controlador;


