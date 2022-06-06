const path = require("path");
const fuctionGeneric = require("../generalFuction");
const dataBase = path.join(__dirname,"../database/product.json")
const dataBaseSQL = require("../database/models");
const controlador = {

    /*
    index:(req,res) => {
        let productos = fuctionGeneric.archivoJSON(dataBase).filter(producto => producto.show);
        res.render("productosGeneral",{productos : productos});
    },*/
    index : async (req,res) => {
        let productos = await dataBaseSQL.findAll(
            {
                where: {
                    show : 1
                },
                limit: 5,
                offset: req.params.pag * 5
            },

        )
        res.render("productosGeneral",{productos : productos})
    },
    /*
    id:(req,res) => {
        let productoSeleccionado = fuctionGeneric.archivoJSON(dataBase).find(producto => producto.id == req.params.id)
        res.render("productDetail",{producto:productoSeleccionado, productRecomiend : fuctionGeneric.archivoJSON(dataBase)})
    },*/
    id : async (req,res) => {
        let productoSeleccionado = await dataBaseSQL.findByPk(req.params.id);
        let productos = await dataBaseSQL.findAll(
            {
                where: {
                    show : 1
                },
                limit: 3,
                offset: valor
            },

        )
        res.render("productDetail",{producto:productoSeleccionado,productRecomiend : productos });
    },

    create: (req,res) => {
        res.render("agregarProducto");
    },
    /*
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
        fuctionGeneric.subirArchivo(dataBase,products);
        res.redirect(`/product/${newProduct.id}`);
    },*/
    
    createFuction: async (req,res) => {
        let img = req.files.map(foto => foto.filename).length > 0 ? req.files.map(foto => foto.filename) : ["default-image.png","default-image.png","default-image.png","default-image.png"];
        await dataBaseSQL.productos.create({
            nombre: req.body.nombre,
            detalle: req.body.detalle,
            precio: req.body.precio,
            stock: req.body.cantidad,
            img : img[0],
            tipo: req.body.tipo,
            show : 1
        });
        for(let i = 1 ; i < img.length ; i++){
            await dataBaseSQL.productImg.create({
            id_producto:  "",
            img: img[i]
        })
        }
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
            }
        })
        fuctionGeneric.subirArchivo(dataBase,listaSinProducto);
        res.redirect("/product");
    }

}
module.exports = controlador;

