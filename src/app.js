const express = require("express");
const path = require("path");
const id = 3000;
const app = express();
const publicPath = path.join(__dirname,"../","public");

app.use(express.static(publicPath));

app.listen(id, () => {
    console.log("Servidor en funcionamiento en el puerto "+ id);
});

app.get('/carrito', function(req,res){
    res.sendFile(path.join(__dirname,"views","carrito.html"));
});

/*app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,"./views/home.html"));
});*/



/*app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname,"./views/..."));
});

app.get('/register', function(req,res){
    res.sendFile(path.join(__dirname,"./views/..."));
});

app.get('/carrito', function(req,res){
    res.sendFile(path.join(__dirname,"./views/..."));
});*/