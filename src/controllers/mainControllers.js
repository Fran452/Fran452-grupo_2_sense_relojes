const dataBaseSQL = require("../database/models");
const controlador = {
    index: async (req,res) => {
        let productos = await dataBaseSQL.productos.findAll(
            {
                where: {
                    show : 1
                },
                limit: 6,
            }
        );
        let categorias  = await dataBaseSQL.categorias.findAll();
        
        console.log(`estos productos se envian al index : ${productos.map(product => product.dataValues.id)} con estas categorias: ${categorias.map(product => product.dataValues.img_Port)}`);
        res.render("home.ejs", {productos : productos.map(product => product.dataValues), categorias : categorias.map(categoria => categoria.dataValues)});
    },
    carrito: async (req,res) => {
        if(req.session?.user){
            let carrito = await dataBaseSQL.carrito.findByPk(
                req.session.user.carrito,
                {
                    include : [{association: "productos"}]
                });
            
            console.log(carrito);
            //return res.json(carrito);
            return res.render("carrito.ejs",{carrito : carrito})
        }
      res.send("no entro");  
    },
}

module.exports = controlador;