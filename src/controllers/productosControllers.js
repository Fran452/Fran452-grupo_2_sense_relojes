const path = require("path");
const fuctionGeneric = require("../generalFuction");
const dataBase = path.join(__dirname,"../database/product.json")
const dataBaseSQL = require("../database/models");
const controlador = {

    
    /*index:(req,res) => {
        let productos = fuctionGeneric.archivoJSON(dataBase).filter(producto => producto.show);
        res.render("productosGeneral",{productos : productos});
    },*/
    index : async (req,res) => {
        let pagina = req.params.pag ?  req.params.pag : 0;
        let productos = await dataBaseSQL.productos.findAll( 
            {
                where: {
                    show : 1
                },
                limit: 5,
                //offset : pagina * 5,
            },

        )
        res.render("productosGeneral",{productos : productos})
    },
    categorias : async (req,res) => {
        let productos = await dataBaseSQL.productos.findAll({
            where : [{show : 1}, {id_tipo : req.params.id}],
            limit: 5,
        });
        res.render("productosGeneral",{productos : productos});
    },
    /*
    id:(req,res) => {
        let productoSeleccionado = fuctionGeneric.archivoJSON(dataBase).find(producto => producto.id == req.params.id)
        console.log(`Se ingreso al producto: ${productoSeleccionado}`);
        res.render("productDetail",{producto:productoSeleccionado, productRecomiend : fuctionGeneric.archivoJSON(dataBase)})
    },*/
    id : async (req,res) => {
        let productoSeleccionadoDB = await dataBaseSQL.productos.findByPk(req.params.id,{include : [{association : "productImg"},{association : "formaDePago"}]});
        let productos = await dataBaseSQL.productos.findAll(
            {
                where: {
                    show : 1
                },
                limit: 3,
            },

        );
        let productoSeleccionado = {
            ...productoSeleccionadoDB.dataValues,
            productImg : productoSeleccionadoDB.dataValues.productImg.map(valor  => valor.dataValues.img),
            formaDePago : productoSeleccionadoDB.dataValues.formaDePago.map(valor  => valor.dataValues.FormaDePago)
        }
        //console.log(productoSeleccionadoDB.dataValues.formaDePago);
        //productoSeleccionado.formaDePago = ["1","2"]
        console.log(req.session.user);
        res.render("productDetail",{producto:productoSeleccionado,productRecomiend : productos , user : req.session.user});
    },

    create: async (req,res) => {
        let formasDePago = await dataBaseSQL.formaDePago.findAll();
        let categorias = await dataBaseSQL.categorias.findAll()
        console.log(formasDePago.map(valor => valor.dataValues));
        res.render("agregarProducto",{formasDePago : formasDePago.map(valor => valor.dataValues), categorias: categorias.map(valor => valor.dataValues)});
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
        console.log(`Se creo el producto: ${newProduct}`);
        fuctionGeneric.subirArchivo(dataBase,products);
        res.redirect(`/product/${newProduct.id}`);
    },*/
    
    createFuction: async (req,res) => {
        let img = req.files.map(foto => foto.filename).length > 0 ? req.files.map(foto => foto.filename) : ["default-image.png","default-image.png","default-image.png","default-image.png"];
        let producto = await dataBaseSQL.productos.create({
            nombre: req.body.nombre,
            detalle: req.body.detalle,
            precio: req.body.precio,
            stock: req.body.cantidad,
            img : img[0],
            id_tipo: req.body.tipo,
            show : 1
        });
        for(let i = 1 ; i < img.length ; i++){
            await dataBaseSQL.productImg.create({
            id_producto: producto.id ,
            img: img[i]
        })
        };
        for(let i = 0 ; i < req.body.formaDePago.length ; i++){
            await dataBaseSQL.productos_FormasDePago.create({
            id_producto: producto.id ,
            id_FormaDePago: req.body.formaDePago[i]
        })
        }
        console.log(producto);
        res.redirect(`/product/${producto.id}`)
    },

    /*editProduct: (req,res) => {
        let productoSeleccionado = fuctionGeneric.archivoJSON(dataBase).find(producto => producto.id == req.params.id )
        res.render("modificarproducto",{product : productoSeleccionado});
    },*/
    editProduct: async(req,res) => {
        let productoSeleccionado = await dataBaseSQL.productos.findByPk(req.params.id);
        res.render("modificarproducto",{product : productoSeleccionado});
    },
    
    /*editProductFuction: (req,res) => {
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
    },*/

    editProductFuction: async (req,res) => {
        console.log(req.body);
        await dataBaseSQL.productos.update({
            nombre : req.body.nombre,
            detalle:req.body.descripcion,
            precio: req.body.precio,
            //img: req.body.foto,
            //formasDePago: req.body.formaDePago
        },{
            where : {id : req.params.id}
        });
        res.redirect(`/product`);
    },

    /*delete: (req,res) => {
        let listaSinProducto = fuctionGeneric.archivoJSON(dataBase)
        listaSinProducto.forEach(producto => {
            if(producto.id == req.params.id){
                producto.show = false;
                console.log(`Producto a eliminar ${producto}`);
            }
        })
        fuctionGeneric.subirArchivo(dataBase,listaSinProducto);
        res.redirect("/product");
    }*/
    delete: async(req,res) => {
        let producto = await dataBaseSQL.productos.update({
            show: 0,
        },{
            where : {id : req.params.id}
        });
        
        res.redirect("/product")
    }

}

module.exports = controlador;

