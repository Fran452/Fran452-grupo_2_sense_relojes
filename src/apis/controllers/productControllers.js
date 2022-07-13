const { xor } = require("lodash");
const dataBaseSQL = require("../../database/models");

const controlador = {
    index : async (req,res) => {
        pagina = req.query.pag? parseInt(req.query.pag)  : 0; // Paginado
        let count = await dataBaseSQL.sequelize.query('SELECT COUNT(id) FROM Producto;'); // traemos la cantidad de productos de la Base de datos
        count = count[0][0]["COUNT(id)"];// lo convertimos en un valor entero para la presentacion
        let countByCategory = await dataBaseSQL.sequelize.query('SELECT Categoria.nombre as "tipo",COUNT(*) as "count" FROM `Producto` INNER JOIN Categoria ON Producto.id_tipo = Categoria.id GROUP By id_tipo;');// la cantidad de productos por categorias
        let formasDePago = await dataBaseSQL.sequelize.query('SELECT Producto.id,formaDePago FROM `Productos_FormasDePago`INNER JOIN Producto on Productos_FormasDePago.id_producto = Producto.id INNER JOIN FormasDePago on Productos_FormasDePago.id_formaDePago = FormasDePago.id;');// tabla intermedia de productos y formas de pago
        let productsPag = await dataBaseSQL.productos.findAll({limit: 3,offset : pagina *3,});// traemos los productos de la pagina seleccioanada
        
        for(producto of productsPag){ //le agregamos a cada producto un array con su forma de pago
            let id = producto.id;
            for(Pago of formasDePago[0]){
                if(producto.dataValues.formasDePago == undefined && Pago.id == id){
                    producto.dataValues.formasDePago = [Pago.formaDePago];
                }else if(Pago.id == id){
                    producto.dataValues.formasDePago.push(Pago.formaDePago);
                }
            }
        }
        countByCategory = countByCategory[0];// seleccioanmos el objeto que queremos mostrar
        let anteriorPagina = pagina == 0 ? "Pagina Inicial":`http://localhost:3000/apis/product/?pag=${pagina - 1}`; // creamos url para pagina siguiente
        let siguientePagina = count - (pagina + 1) * 3 <= 0 ? "Ultima Pagina" : `http://localhost:3000/apis/product/?pag=${pagina + 1}`;// creamos url a pagina anterior
        productsPag.map(producto => producto.dataValues.detalle =`http://localhost:3000/apis/product/${producto.dataValues.id}`);// le agregamos a cada produto su url con el detalle
        products = {// creamos un objeto para presentar a la vista
            productos : {...productsPag},
            next: siguientePagina,
            previous: anteriorPagina
            
        }
        console.clear();// borramos datos de consola 
        console.log("Se ingreso a el index de apis");// aclaramos donde se ingreso 
        res.json({count, products,countByCategory});// enviamos respuesta a la pagina
    },

    detalle : async (req,res) => {
        
        let producto = await dataBaseSQL.productos.findByPk(req.params.id,{
            include : [{association : "productImg"},{association : "formaDePago"}],
        });// buscamos el objeto solicitado en la base de datos 
        let urlImg = `http://localhost:3000/img/product/${producto.img}`// le creamos un url para su imagen
        producto ={// creamos el objeto a enviar a la vista
            ...producto.dataValues,
            urlImg
        }
        console.clear();// borramos datos de consola 
        console.info(`Se ingreso a el detalle de apis del producto ${req.params.id}`);// aclaramos donde se ingreso 
        res.json({producto,paginaDetalle : "http://localhost:3000/apis/product"});// enviamos respuesta a la pagina
    },

    productos: async (req,res) => {
        let productsPag = await dataBaseSQL.productos.findAll();
        let formasDePago = await dataBaseSQL.sequelize.query('SELECT Producto.id,formaDePago FROM `Productos_FormasDePago`INNER JOIN Producto on Productos_FormasDePago.id_producto = Producto.id INNER JOIN FormasDePago on Productos_FormasDePago.id_formaDePago = FormasDePago.id;');// tabla intermedia de productos y formas de pago
        for(producto of productsPag){ //le agregamos a cada producto un array con su forma de pago
            let id = producto.id;
            for(Pago of formasDePago[0]){
                if(producto.dataValues.formasDePago == undefined && Pago.id == id){
                    producto.dataValues.formasDePago = [Pago.formaDePago];
                }else if(Pago.id == id){
                    producto.dataValues.formasDePago.push(Pago.formaDePago);
                }
            }
        }
        res.json(productsPag);
    }

}

module.exports = controlador;
