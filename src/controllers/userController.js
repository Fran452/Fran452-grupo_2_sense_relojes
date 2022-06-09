const path = require("path");
const db = require("../database/models/usuarios.js")

const controlador = {
    login:(req,res) => {res.render("login")},
    // register:(req,res) => {res.render("register")},
    crear:async (req,res) => {
        let usuario = await db.usuarios.findAll()

        res.render("register", {usuarios:usuarios})
    },
//     id : async (req,res) => {
//         let usuarioDB = await dataBaseSQL.usuarios.findByPk(req.params.id,{include : [{association : "usuarioImg"},]});
//         let usuario = await dataBaseSQL.ususarios.findAll(
//             {
//                 where: {
//                     show : 1
//                 },
//     })
// },
    newUser: async (req,res) => {
        let img = req.files.map(foto => foto.filename).length > 0 ? req.files.map(foto => foto.filename) : ["default-image.png"];
        let userToCreate  = await db.usuarios.create({
            nombre:req.body.name,
            apellido: req.body.apellido,
            email:req.body.email ,
            telefono: req.body.telefono,
            fechaDeNacimiento: req.body.birth_date ,
            img: img[0],
            // contraseña: bcrypt
        });
        for(let i = 1 ; i < img.length ; i++){
            await dataBaseSQL.userImg.create({
            id_producto: producto.id ,
            img: img[i]
        })  
    };
},
    detalle: (req,res) => {
        db.Usuarios.findByPk(req.params.id)
        .then (function(usuario){
            res.render("perfile",{usuario})
        } )
    },
    editar: async(req,res) => {
        
        let pedidoUsuario =await db.Usuario.findByPk(req.params.id);
       
    },
    }


module.exports = controlador;