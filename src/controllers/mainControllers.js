const { retry } = require("async");
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
            let productosVista = []
            let carrito = await dataBaseSQL.carrito.findByPk(
                req.session.user.carrito,
                {
                    include : [{association: "productos"}]
                });
                let cantidadDeCadaProducto = await dataBaseSQL.carritoProducto.findAll({
                    where : {id_carrito : carrito.id} 
                });

                for (producto of carrito.productos){
                    for (objeto of cantidadDeCadaProducto){
                        if(objeto.id_producto == producto.id){
                            producto.dataValues.cantidad = objeto.dataValues.cantidad;
                            producto.dataValues.precioTotal = producto.dataValues.cantidad * producto.dataValues.precio
                        }
                    }
                    productosVista.push({...producto.dataValues})
                }
            let precioTotalPrductos = productosVista.reduce( function(acc,elemento){
                return acc + elemento.precioTotal
            },0)
            
            //return res.json({productosVista,precioTotalPrductos});
            return res.render("carrito.ejs",{productos : productosVista, valorTotal : precioTotalPrductos})
        }
      res.render("not-found");  
    },
}

module.exports = controlador;