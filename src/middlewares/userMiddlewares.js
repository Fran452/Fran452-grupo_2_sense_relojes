const userMiddlewares = {
    
    admin : (req,res,next) => {
        if(req.session.user?.admin){
            next();
        }else{
            return res.send("no tiene los permisos de administrador");
        }
    },
    userRegister: (req,res,next) => {
        if(req.session.user){
            next();
        }else{
            return res.redirect("/user/register");
        }
    },
    reinCookies: (req,res,next) => {
        if(req.cookies?.user){
            res.cookie("user",req.cookies.user,{maxAge : 3000000000**1000000000000});
            next();
        }
        next();
    },
    integrarCookies: (req,res,next) => {
        if(req.cookies && req.cookies.user){
            req.session.user = {
                ...req.cookies.user
            }
            res.locals.user = {
                ...req.cookies.user
            }
        }
        next();
    },
    guardarRegistro: (req,res,next) => {
        if(req.session.user){
            res.locals.user = req.session.user;
            next();
        }
        next();
    },
    redirectPerfil : (req,res,next) => {
        if(req.session.user){
            return res.redirect("/user/perfile");
        }
        next();
    }

}

module.exports = userMiddlewares