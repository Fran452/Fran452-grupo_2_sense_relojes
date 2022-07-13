const dataBaseSQL = require("../../database/models");
const link = process.env.link || "http://localhost:3030";

const controlador = {
    users : async (req,res) => {
        let users = await dataBaseSQL.usuarios.findAll();
        let count = users.length;
        console.log(users);
        users.forEach(usuario => { 
            let user = {
                id : usuario.dataValues.id,
                nombre: usuario.dataValues.nombre,
                apellido: usuario.dataValues.apellido,
                email : usuario.dataValues.email,
                detail: `${link}/apis/users/${usuario.dataValues.id}`
            }
            usuario.dataValues = user  
        })
        console.log(users);
        res.json({count,users});
    },

    detalle : async (req,res) => {
        let user = await dataBaseSQL.usuarios.findByPk(req.params.id);
        let camposRequeridos = {
            ...user.dataValues,
            "contraseña" : null,
            imgUrl:`${link}/img/user/${user.img}`,
        } 
        res.json({camposRequeridos})
    }
}

module.exports = controlador;