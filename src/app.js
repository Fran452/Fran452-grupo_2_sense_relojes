const express = require("express");
const path = require("path");
const methodOverride = require('method-override');

const rutasUser = require("./routes/user");
const rutasProductos = require("./routes/productos");
const rutasMain = require("./routes/main");


const PORT = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname,"../","public");
app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : false}));

app.set("view engine","ejs");
app.set("views","./src/views");


app.listen(PORT, () => {
    console.log("Servidor en funcionamiento en el puerto "+ PORT);
});

app.use('/',rutasMain);

app.use('/user', rutasUser);

app.use('/product',rutasProductos);

