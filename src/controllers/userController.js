const path = require("path");
const db = require("../database/models/usuarios.js")

const controlador = {
    login:(req,res) => {res.render("login")},
    // register:(req,res) => {res.render("register")},
    crear:async (req,res) => {
        let usuario = await db.usuarios.findAll()

        res.render("register", {usuarios:usuarios})
    },
    newUser: async (req,res) => {
        let userToCreate  = await db.usuarios.create({
            nombre:req.body.name,
            email:req.body.email ,
            telefono: req.body.telefono,
            fechaDeNacimiento: req.body.birth_date ,
            
            // Falta agregar 
            
        })
        usuario.id 
    },
    detalle: (req,res) => {
        db.Usuarios.findByPk(req.params.id)
        .then (function(usuario){
            res.render("perfile",{usuario})
        } )
    },
    editar: (req,res) => {
        
        let pedidoUsuario = db.Usuario.findByPk(req.params.id);

    }
}

module.exports = controlador;