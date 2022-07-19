const path = require("path"); //? Busqueda de la base de datos de JSON
const funcionesGenericas = require("../generalFuction"); //? Exporto funciones para Base de datos JSON y para los logs
const dataBase = path.join(__dirname, "../database/product.json"); //? Base de datos de JSON
const dataBaseSQL = require("../database/models"); //? Base de datos SQL
const controlador = {
	/* //? index para JSON
	index:(req,res) => {
        let productos = funcionesGenericas.archivoJSON(dataBase).filter(producto => producto.show);
        res.render("productosGeneral",{productos : productos});
    },*/

	//? Pagina de index
	index: async (req, res) => {
		let pagina = req.params.pag ? req.params.pag : 0;
		let productos = await dataBaseSQL.productos.findAll({
			where: {
				show: 1
			},
			limit: 5
			//offset : pagina * 5,
		});
		let categoria = await dataBaseSQL.categorias.findByPk(4);
		funcionesGenericas.newLog(`Entre al index de Productos link: ${process.env.link}/product\n`)
		res.render("productosGeneral", {productos: productos, categoria});
	},

	//? Pagina de categorias
	categorias: async (req, res) => {
		let productos = await dataBaseSQL.productos.findAll({
			where: {
				show: 1,
				id_tipo: req.params.id
			},
			limit: 5
			//offset : pagina * 5,
		});
		let categoria = await dataBaseSQL.categorias.findByPk(req.params.id);
		funcionesGenericas.newLog(`Entre a la categorias: ${categoria.nombre} de Productos link: ${process.env.link}/product/${categoria.id}\n`)
		//return res.json( {productos: productos , categoria})
		return res.render("productosGeneral", {productos: productos, categoria} );
	},

	/* //? Id para JSON
	id:(req,res) => {
        let productoSeleccionado = funcionesGenericas.archivoJSON(dataBase).find(producto => producto.id == req.params.id)
        console.log(`Se ingreso al producto: ${productoSeleccionado}`);
        res.render("productDetail",{producto:productoSeleccionado, productRecomiend : funcionesGenericas.archivoJSON(dataBase)})
    },*/

	//? Pagia de detalle del producto
	id: async (req, res) => {
		let productoSeleccionadoDB = await dataBaseSQL.productos.findByPk(
			req.params.id,
			{include: [{association: "productImg"}, {association: "formaDePago"}]}
		);
		let productos = await dataBaseSQL.productos.findAll({
			where: {
				show: 1
			},
			limit: 3
		});
		let productoSeleccionado = {
			...productoSeleccionadoDB.dataValues,
			productImg: productoSeleccionadoDB.dataValues.productImg.map(
				valor => valor.dataValues.img
			),
			formaDePago: productoSeleccionadoDB.dataValues.formaDePago.map(
				valor => valor.dataValues.FormaDePago
			)
		};
		funcionesGenericas.newLog(`Entre a la producto: ${productoSeleccionado.nombre} link: ${process.env.link}/product/${productoSeleccionado.id}\n`)
		res.render("productDetail", {
			producto: productoSeleccionado,
			productRecomiend: productos,
			user: req.session.user
		});
	},

	//? Pagina visual de creacion
	create: async (req, res) => {
		let formasDePago = await dataBaseSQL.formaDePago.findAll();
		let categorias = await dataBaseSQL.categorias.findAll()
		console.log(formasDePago.map(valor => valor.dataValues));
		funcionesGenericas.newLog(`Se ingreso al Get de cracion de productos link: ${process.env.link}/product/new\n`)
		res.render("agregarProducto", {
			formasDePago: formasDePago.map(valor => valor.dataValues),
			categorias
		});
		
	},
	
	/* //? CreateFuction para JSON
	createFuction: (req,res) => {
        let products =  funcionesGenericas.archivoJSON(dataBase);
        let img = req.files.map(foto => foto.filename).length > 0 ? req.files.map(foto => foto.filename) : ["default-image.png","default-image.png","default-image.png","default-image.png"];
        let formaDePago = [].concat(req.body.formaDePago)
        let newProduct = {
            id : funcionesGenericas.crearID(products),
            ... req.body,
            formaDePago : formaDePago,
            datosDetacados : [],
            img :  img,
            show : true
        }
        products.push(newProduct);
        console.log(`Se creo el producto: ${newProduct}`);
        funcionesGenericas.subirArchivo(dataBase,products);
        res.redirect(`/product/${newProduct.id}`);
    },*/

	//? Funcion de cracion
	createFuction: async (req, res) => {
		let img =
			req.files.map(foto => foto.filename).length > 0
				? req.files.map(foto => foto.filename)
				: [
						"default-image.png",
				  ];
		let producto = await dataBaseSQL.productos.create({
			nombre: req.body.nombre,
			detalle: req.body.descripcion,
			precio: req.body.precio,
			stock: req.body.cantidad,
			img: img[0],
			id_tipo: req.body.tipo,
			show: 1
		});
		funcionesGenericas.newLog(`Se creo un nuevo producto:
	id: ${producto.id}
	nombre: ${producto.nombre}
	detalle: ${producto.descripcion}
	precio: ${producto.precio}
	stock: ${producto.stock}
	imgPrincipal: ${producto.img}
	tipo: ${producto.id_tipo}\n`)
		for (let i = 1; i < img.length; i++) {
			let imgSecundaria = await dataBaseSQL.productImg.create({
				id_producto: producto.id,
				img: img[i]
			});
			funcionesGenericas.newLog(`	Imagenes asociadas: ${imgSecundaria.img}\n`)
		}
		let formaDePago = [].concat(req.body.formaDePago)
		for (let i = 0; i < req.body.formaDePago.length; i++) {
			let formaDePagos = await dataBaseSQL.productos_FormasDePago.create({
				id_producto: producto.id,
				id_formaDePago: req.body.formaDePago[i]
			});
			funcionesGenericas.newLog(`	Formas de pago asociadas: ${formaDePagos.id_formaDePago}\n`)
		}
		funcionesGenericas.newLog(`Fin de la creacion\n`)
		res.redirect(`/product/${producto.id}`);
	},

	/* //? EditProduct para JSON
	editProduct: (req,res) => {
        let productoSeleccionado = funcionesGenericas.archivoJSON(dataBase).find(producto => producto.id == req.params.id )
        res.render("modificarproducto",{product : productoSeleccionado});
    },*/

	//? Vista editar producto
	editProduct: async (req, res) => {
		let productoSeleccionado = await dataBaseSQL.productos.findByPk(
			req.params.id
		);
		funcionesGenericas.newLog(`Es ingreso a modificar el producto: ${productoSeleccionado.nombre} link: ${process.env.link}/product/${productoSeleccionado.id}/edit\n`)
		res.render("modificarproducto", {product: productoSeleccionado});
	},

	/* //? EditProductFuction para JSON
	editProductFuction: (req,res) => {
        let products =  funcionesGenericas.archivoJSON(dataBase);
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
        funcionesGenericas.subirArchivo(dataBase,products);
        res.redirect(`/product`);
    },*/

	//? Funcion editar producto
	editProductFuction: async (req, res) => {
		console.log(req.body);
		await dataBaseSQL.productos.update(
			{
				nombre: req.body.nombre,
				detalle: req.body.descripcion,
				precio: req.body.precio
				//img: req.body.foto,
				//formasDePago: req.body.formaDePago
			},
			{
				where: {id: req.params.id}
			}
		);
		funcionesGenericas.newLog(`se modifico del producto:
		nombre: ${req.body.nombre}
		descripcion: ${req.body.descripcion}
		precio: ${req.body.precio}\n`)
		res.redirect(`/product`);
	},

	/* //? Delete para JSON
	delete: (req,res) => {
        let listaSinProducto = funcionesGenericas.archivoJSON(dataBase)
        listaSinProducto.forEach(producto => {
            if(producto.id == req.params.id){
                producto.show = false;
                console.log(`Producto a eliminar ${producto}`);
            }
        })
        funcionesGenericas.subirArchivo(dataBase,listaSinProducto);
        res.redirect("/product");
    }*/

	//? Funcion eliminar prodcuto
	delete: async (req, res) => {
		await dataBaseSQL.productos.update(
			{
				show: 0
			},
			{
				where: {id: req.params.id}
			}
		);
		funcionesGenericas.newLog(`Se elimino el siguiente producto:${req.params.id}\n`)
		res.redirect("/product");
	}
};

module.exports = controlador;
