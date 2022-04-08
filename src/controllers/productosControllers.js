const path = require("path");

const fuctionGeneric = require("../generalFuction");
const dataBase = path.join(__dirname,"../database/product.json")

const controlador = {
    index:(req,res) => {
        let productos = fuctionGeneric.archivoJSON(dataBase);
        res.render("productosGeneral",{productos : productos});
    },
    id:(req,res) => {
        let productoSeleccionado = fuctionGeneric.archivoJSON(dataBase).find(producto => producto.id == req.params.id )
        res.render("productDetail",{producto:productoSeleccionado, productRecomiend : fuctionGeneric.archivoJSON(dataBase)})
    },

    create: (req,res) => {
        res.render("agregarProducto");
    },
    createFuction: (req,res) => {
        let products =  fuctionGeneric.archivoJSON(dataBase);
        let img = req.files.map(foto => foto.filename).length > 0 ? req.files.map(foto => foto.filename) : ["default-image.png","default-image.png","default-image.png","default-image.png"];
        let newProduct = {
            id : fuctionGeneric.crearID(products),
            ... req.body,
            datosDetacados : [],
            img :  img,
            show : true
        }
        products.push(newProduct);
        products = fuctionGeneric.ordenarSegundID(products);
        fuctionGeneric.subirArchivo(dataBase,products);
        res.redirect(`/product/${newProduct.id}`);
    },

    editProduct: (req,res) => {
        let productoSeleccionado = fuctionGeneric.archivoJSON(dataBase).find(producto => producto.id == req.params.id )
        res.render("modificarproducto",{product : productoSeleccionado});
    },
    editProductFuction: (req,res) => {
        let products =  fuctionGeneric.archivoJSON(dataBase);
        console.log(req.body);
        products.forEach(producto => {
            if(producto.id == req.params.id){
                
            }
        });
    },

    delete: (req,res) => {

    }
}
module.exports = controlador;

