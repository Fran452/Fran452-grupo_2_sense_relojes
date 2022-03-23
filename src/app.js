const express = require("express");
const path = require("path");


const PORT = process.env.PORT || 3000;

const app = express();


const publicPath = path.join(__dirname,"../","public");

app.use(express.static(publicPath));



app.listen(PORT, () => {
    console.log("Servidor en funcionamiento en el puerto "+ PORT);
});

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,"./views/home.html"));
});

app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname,"./views/login.html"));
});

app.get('/register', function(req,res){
    res.sendFile(path.join(__dirname,"./views/register.html"));
});

app.post('/register', function(req,res){
    res.sendFile(path.join(__dirname,"./views/register.html"));
})

app.get('/carrito', function(req,res){
    res.sendFile(path.join(__dirname,"./views/carrito.html"));
});

app.get('/productoEspesifico', function(req,res){
    res.sendFile(path.join(__dirname,"./views/productDetail.html"));
});

app.get('/producto', function(req,res){
    res.sendFile(path.join(__dirname,"./views/productosGeneral.html"));
});