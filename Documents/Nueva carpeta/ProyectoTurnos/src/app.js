const express = require("express");
const path = require("path");



const rutasMain = require("./routes/mainRoutes");
const rutasUser = require("./routes/user");
const { applyEachSeries } = require("async");

const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname,"../public")));
app.set ('view engine','ejs');
app.set ("views",path.join(__dirname,"/views"));

app.use('/',rutasMain);
app.use('/listadoDeTurnos',rutasMain);
app.use('/User', rutasUser);


app.listen(3000, () =>{
     console.log("Servidor Funcionando en 3000")
});


