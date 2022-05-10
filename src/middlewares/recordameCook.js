const { cookie } = require("express-validator");
const fs = require('fs');
const path = require('path');
const db = path.join(__dirname,"../database/user.json");
const funcionesGenerales = require('../generalFuction.js');

function recordameCook (req, res,next){
    
    if (req.cookie.user != undefined && req.session.usuario == undefined) {
        let usersJSON = funcionesGenerales.archivoJSON(db);
        let users;
        if(users.usersJSON == ""){
            users = [];
        } else {
            users = JSON.parse (usersJSON);
        }
        let usuarioALoguearse

        for (let i = 0; i < users.length; i++) {
            if (users[i].email == req.cookies.recordameCook) {
                        usuarioALoguearse = users[i];
                        break;
                    }
            }q  
            // creo que falta llamarlo en app
            req.session.usuarioLogueado = usuarioALoguearse;
    
            next()
        }
    next();
}


module.exports = recordameCook