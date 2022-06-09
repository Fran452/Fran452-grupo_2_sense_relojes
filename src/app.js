/************* Metodos requeridos ****************/ 
const express = require("express");
const path = require("path");
const methodOverride = require ("method-override");
const session = require("express-session");
const { applyEachSeries } = require("async");
const cookieParser = require("cookie-parser");
/*********** Rutas inportada ***************************/
const rutasUser = require("./routes/user");
const rutasProductos = require("./routes/productos");
const rutasMain = require("./routes/main");

/******** Diferentes funcionamientos ****************/
const PORT = process.env.PORT || 3001;
const app = express();
const publicPath = path.join(__dirname,"../","public");

/*************** Middlewares *************************/
app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : false}));
app.use(session({secret : "contraseñaLinda",resave : false, saveUninitialized : false}));
app.set("view engine","ejs");
app.set("views","./src/views");

/***************** Rutas **********************/
app.use('/',rutasMain);

app.use('/user', rutasUser);

app.use('/product',rutasProductos);

/**************** Inicio de apliacion ***************************/

app.listen(PORT, () => {
    console.log("Servidor en funcionamiento en el puerto "+ PORT);
});

/**************** Error 404 ***************************/
app.use((req,res,next) => {
    res.status(404).render("not-found")
})
