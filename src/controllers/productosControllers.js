const path = require("path");
const fuctionGeneric = require("../generalFuction");
const dataBase = path.join(__dirname,"../database/product.json")

const controlador = {


    index:(req,res) => {
        let productos = fuctionGeneric.archivoJSON(dataBase).filter(producto => producto.show);
        res.render("productosGeneral",{productos : productos});
    },

    id:(req,res) => {
        let productoSeleccionado = fuctionGeneric.archivoJSON(dataBase).find(producto => producto.id == req.params.id)
        console.log(`Se ingreso al producto: ${productoSeleccionado}`);
        res.render("productDetail",{producto:productoSeleccionado, productRecomiend : fuctionGeneric.archivoJSON(dataBase)})
    },

    create: (req,res) => {
        res.render("agregarProducto");
    },
    createFuction: (req,res) => {
        let products =  fuctionGeneric.archivoJSON(dataBase);
        let img = req.files.map(foto => foto.filename).length > 0 ? req.files.map(foto => foto.filename) : ["default-image.png","default-image.png","default-image.png","default-image.png"];
        let formaDePago = [].concat(req.body.formaDePago)
        let newProduct = {
            id : fuctionGeneric.crearID(products),
            ... req.body,
            formaDePago : formaDePago,
            datosDetacados : [],
            img :  img,
            show : true
        }
        products.push(newProduct);
        console.log(`Se creo el producto: ${newProduct}`);
        fuctionGeneric.subirArchivo(dataBase,products);
        res.redirect(`/product/${newProduct.id}`);
    },

    editProduct: (req,res) => {
        let productoSeleccionado = fuctionGeneric.archivoJSON(dataBase).find(producto => producto.id == req.params.id )
        res.render("modificarproducto",{product : productoSeleccionado});
    },
    
    editProductFuction: (req,res) => {
        let products =  fuctionGeneric.archivoJSON(dataBase);
        products.forEach(producto => {
            if(producto.id == req.params.id){
                producto.name = req.body.name;
                producto.descripcion = req.body.descripcion;
                producto.precio = req.body.precio;
                producto.foto = req.body.foto;
                producto.formaDePago = req.body.formaDePago;
                console.log(`Se edito el producto: ${product}`);
            }
        });
        fuctionGeneric.subirArchivo(dataBase,products);
        res.redirect(`/product`);
    },

    delete: (req,res) => {
        let listaSinProducto = fuctionGeneric.archivoJSON(dataBase)
        listaSinProducto.forEach(producto => {
            if(producto.id == req.params.id){
                producto.show = false;
                console.log(`Producto a eliminar ${producto}`);
            }
        })
        fuctionGeneric.subirArchivo(dataBase,listaSinProducto);
        res.redirect("/product");
    }

}
module.exports = controlador;

