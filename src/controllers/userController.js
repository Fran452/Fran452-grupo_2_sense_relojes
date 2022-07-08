const funcionesGenericas = require("../generalFuction");
const path = require("path");
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator");
const { fstat } = require("fs");
const dbJSON = path.join(__dirname,"../database/clientes.json");
const db = require("../database/models");
const { get } = require("dottie");

const controlador = {
    login:(req,res) => {res.render("login")},
    // register:(req,res) => {res.render("register")},
    crear: async (req,res) => {
        let usuario = await db.usuarios.findAll()

        res.render("register", {usuarios:usuario})
    },
    /*id : async (req,res) => {
         let usuarioDB = await dataBaseSQL.usuarios.findByPk(req.params.id,{include : [{association : "usuarioImg"},]});
         let usuario = await dataBaseSQL.ususarios.findAll(
             {
                 where: {
                     show : 1
                },
     })
    },*/
    loginFuction : async (req,res)=> {
        if(!(req.body.user)){
            console.log(`la proiedad dio undefined`);
            return res.redirect("/user")
        }
        
        let usuario = await db.usuarios.findOne({
            where : {
                email : req.body.user
            }
        })
        if(bcrypt.compareSync(req.body.pass,usuario.contraseña)){
            let carrito = await db.carrito.findOne({
                where : {
                    id_usuario :  usuario.id
                }
            })
            req.session.user = { id : usuario.id,
                                admin : usuario.admin,
                                nombre : usuario.nombre,
                                carrito : carrito.id}; 
            console.log(req.body.profile);
            if(req.body.profile){
                console.log("entre a la cookies");
                res.cookie("user",{id : req.session.user.id, admin : req.session.user.admin, nombre : req.session.user.nombre, carrito:req.session.user.carrito },{ expires: new Date(Date.now() + (30*24*3600000)) }); // no funca las cookies
                console.log(req.cookies);
            }
            return res.redirect("/user/perfile");
        }
        return res.redirect("/user");
    },
    
    newUser: async (req,res) => {
        let img = req.files.map(foto => foto.filename).length > 0 ? req.files.map(foto => foto.filename) : ["default-image.png"];
        let validaciones = validationResult(req);
        // errores al momento de completar mal el formulario
        if(validaciones.errors.length > 0){
            console.log("entre al error");
            if(img != "default-image.png"){
                funcionesGenericas.eliminarArchivo(path.join(__dirname,"../../public/img/user",img))
            }
            return res.render("register",{error:validaciones.mapped()});
        }
        let nombre = req.body.name.split(',')[0]; 
        let apellido =req.body.name.split(',')[1];
        
        let userToCreate  = await db.usuarios.create({
            nombre,
            apellido,
            email:req.body.email ,
            telefono: req.body.telefono,
            fechaDeNacimiento: req.body.birth_date ,
            img: img[0],
            contraseña: bcrypt.hashSync(req.body.contraseña,10),
            admin : 0     
        });

        let carrito  = await db.carrito.create({
            id_usuario : userToCreate.id
        });

        
        req.session.user = userToCreate.id
        req.session.carrito = carrito.id
        if(req.body.guardarCook){
            res.cookie(user,userToCreate.id,{maxAge: new Date(Date.now() + (30*24*3600000))})
        }
        res.redirect("/user/perfile");
    },
    
    detalle: (req,res) => {
        db.usuarios.findByPk(req.session.user.id)
        .then (usuario => {
            return res.render("perfile",{user : usuario})
        })
    },
    editar: async(req,res) => {
        let pedidoUsuario = await db.Usuario.findByPk(req.session.user);
       
    },

    addCarrito: async (req,res) => {
        if(req.session.user){
            let producto = await db.carritoProducto.findOne({
                where : {id_producto : parseInt(req.params.id)}
            });
            console.log(producto);
            if(producto){
                let cantidadUnicial = producto.cantidad;
                console.log(cantidadUnicial);
                console.log("Entre al producto existente");
                producto = await db.carritoProducto.update({cantidad : cantidadUnicial + 1},{where : {id_producto : req.params.id}});
                return res.json(producto);
            }else{
                console.log("Entre al producto nuevo");
                let agregarCarrito = await db.carritoProducto.create({
                id_producto : parseInt(req.params.id),
                id_carrito : req.session.user.carrito,
                cantidad : 1
                });
                return res.json(agregarCarrito);
            }
        
        

        }
        return res.send("registrate");
    },

    elinarCarrito : async (req,res) => {
        let carritoEliminado = await db.carritoProducto.delete({
            where : {
                id : req.params.id
            }
        })
        res.json(carritoEliminado);
    }
}


module.exports = controlador;


