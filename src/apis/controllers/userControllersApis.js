const dataBaseSQL = require("../../database/models");

const controlador = {
    users : async (req,res) => {
        let users = await dataBaseSQL.usuarios.findAll();
        let count = users.length;
        console.log(users);
        users.forEach(usuario => { 
            let user = {
            ...usuario.dataValues,
            imgUrl:`http://localhost:3000/img/user/${usuario.img}`
            }
            usuario.dataValues = user
            console.log(usuario);   
        })
        console.log(users);
        res.json({users,count});
    },

    detalle : async (req,res) => {
    }

}

module.exports = controlador;