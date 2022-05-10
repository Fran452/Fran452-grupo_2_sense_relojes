const { cookie } = require("express-validator");

function recordameCook (req, res,next){
    next();
}
if (req-cookie.recordameCook != undefined && req.session.usuario == undefined) {
let usersJSON = fs.readFileSync ("users.json", {
    encoding: "utf-8" });
    let users;
    if(users.usersJSON == " "){
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
        }
        // creo que falta llamarlo en app
        req.session.usuarioLogueado = usuarioALoguearse;

        next()
    }

    module.exports = recordameCook