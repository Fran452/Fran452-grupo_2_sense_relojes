const funcionesGenericas = require("../generalFuction");
const path = require("path");
const bcrypt = require("bcrypt");
const db = path.join(__dirname, "../database/clientes.json")

const controlador = {
    login:(req,res) => {
        res.render("login")
    },
    register:(req,res) => {
        res.render("register")
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
    }
}

module.exports = controlador;