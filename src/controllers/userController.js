const funcionesGenericas = require("../generalFuction");
const path = require("path");
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator");
const dbJSON = path.join(__dirname, "../database/clientes.json");
const db = require("../database/models");

const controlador = {
	//? Logearse usuario vista
	login: (req, res) => {
		funcionesGenericas.newLog(`Get de login link: ${process.env.link}/user/login\n`);
        return res.render("login");
	},
	//? Crear usuario vista
	crear: async (req, res) => {
		let usuario = await db.usuarios.findAll();
        funcionesGenericas.newLog(`Get de registro link: ${process.env.link}/user/register\n`);
		res.render("register", {usuarios: usuario});
	},
	//? Logearse usuario funcion
	loginFuction: async (req, res) => {
		if (!req.body.user) {
			console.log(`la proiedad dio undefined`);
			return res.redirect("/user");
		}

		let usuario = await db.usuarios.findOne({
			where: {
				email: req.body.user
			}
		});
		if (bcrypt.compareSync(req.body.pass, usuario.contraseña)) {
			let cookiesActive = false;
			let carrito = await db.carrito.findOne({
				where: {
					id_usuario: usuario.id
				}
			});
			req.session.user = {
				id: usuario.id,
				admin: usuario.admin,
				nombre: usuario.nombre,
				carrito: carrito.id
			};
			if (req.body.profile) {
				cookiesActive = true
                res.cookie(
					"user",
					{
						id: req.session.user.id,
						admin: req.session.user.admin,
						nombre: req.session.user.nombre,
						carrito: req.session.user.carrito
					},
					{expires: new Date(Date.now() + 30 * 24 * 3600000)}
				);
			}
			funcionesGenericas.newLog(`	Se registro el siguiente usuario: ${req.session.user.nombre}
	Se registro el siguiente cookies: ${cookiesActive? "cookies activada" : "no registro cookies"}\n`);
			return res.redirect("/user/perfile");
		}
        funcionesGenericas.newLog(` no se pudo registrar por un fallo de la contraseña`);
		return res.redirect("/user");
	},
	//? Crear nuevo usuario
	newUser: async (req, res) => {
		let img =
			req.file?.filename ? req.file.filename
				: "default-image.png";
		let validaciones = validationResult(req);
		// errores al momento de completar mal el formulario
		if (validaciones.errors.length > 0) {
			console.log("entre al error");
			if (img != "default-image.png") {
				funcionesGenericas.eliminarArchivo(
					path.join(__dirname, "../../public/img/user", img)
				);
			}
			return res.render("register", {error: validaciones.mapped()});
		}
		let nombre = req.body.nombre.split(",")[0];
		let apellido = req.body.nombre.split(",")[1];

		let userToCreate = await db.usuarios.create({
			nombre,
			apellido,
			email: req.body.email,
			telefono: req.body.telefono,
			fechaDeNacimiento: req.body.fechaDeNacimiento,
			img,
			contraseña: bcrypt.hashSync(req.body.contraseña, 10),
			admin: 0
		});

		let carrito = await db.carrito.create({
			id_usuario: userToCreate.id
		});

		req.session.user = {id : userToCreate.id,admin : userToCreate.admin, nombre: userToCreate.nombre,carrito : carrito.id};
		if (req.body.guardarCook) {
			var registroCookies = "cookies registradas"
			res.cookie(user, userToCreate.id, {
				maxAge: new Date(Date.now() + 30 * 24 * 3600000)
			});
		}
		funcionesGenericas.newLog(`Nuevo usuario creado:
	id: ${userToCreate.id}
	nombre: ${userToCreate.nombre}
	apellido: ${userToCreate.apellido}
	email: ${userToCreate.email}
	telefono: ${userToCreate.telefono}
	fecha de nacimiento: ${userToCreate.fechaDeNacimiento}
	img: ${userToCreate.img}
	contraseña Incriptada: ${userToCreate.contraseña}
	administrador: ${userToCreate.admin}
	Guardo las cookies: ${registroCookies} \n`);
        return res.redirect("/user/perfile");
	},
	//?  Detalle de usuario
	detalle: (req, res) => {
		db.usuarios.findByPk(req.session.user.id).then(usuario => {
			//console.clear();
            funcionesGenericas.newLog(`Entre al perfil link: ${process.env.link}/user/perfile
	Perfil Activo: ${req.session.user.nombre}
	Cookies actual: ${req.cookies.user?.nombre|| "no registro cookies"}\n`)
			return res.render("perfile", {user: usuario});
		});
	},
	//? Editar el usuario //! Proximamente
	editar: async (req, res) => {
		let pedidoUsuario = await db.Usuario.findByPk(req.session.user);
	},
	//? Salir del usuario
	salir: (req, res) => {
		let usuarioEliminado = {...req.session.user};
		delete req.session.user;
		delete res.locals.user;
		res.cookie("user", {});
		funcionesGenericas.newLog(`El usuario salio link: ${process.env.link}/user/salir
	nombre del usuario que salio: ${usuarioEliminado.nombre}\n`)
		return res.json(usuarioEliminado);
	},
	//? Carrito Funciones
	addCarrito: async (req, res) => {
		if (req.session.user) {
			let productoCarrito = await db.carritoProducto.findOne({
				where: {id_producto: parseInt(req.params.id)}
			});
			let producto = await db.productos.findByPk(parseInt(req.params.id));
			if (productoCarrito) {
				let cantidadUnicial = productoCarrito.cantidad;
				if (parseInt(cantidadUnicial) + 1 <= producto.stock) {
					sumarAlCarrito = await db.carritoProducto.update(
					{cantidad: cantidadUnicial + 1},
					{where: {id_producto: req.params.id}})
					funcionesGenericas.newLog(`Se le agrego un producto ${producto.nombre} entonces se tiene la cantidad de ${parseInt(cantidadUnicial)+1}\n`)
					return res.json	({estus :0})
				}else{
					funcionesGenericas.newLog(`No se agrego el prodcuto ya que el usuario supero el stock\n`)
					return res.json({estus :1,error: "Supero el Stock"});
				}
			} else {
				await db.carritoProducto.create({
					id_producto: parseInt(req.params.id),
					id_carrito: req.session.user.carrito,
					cantidad: 1
				});
				funcionesGenericas.newLog(`Se agrego el producto ${producto.nombre} al carrito\n`)
				return res.json({estus :0});
			}
		}
		funcionesGenericas.newLog(`No se agrego el prodcuto ya que el usuario no esta registrado\n`)
		return res.json({estus :1,error: "Usuario no registrado"});
	},
	//? Eliminar elementos del carrito
	elinarCarrito: async (req, res) => {
		await db.carritoProducto.destroy({
			where: {
				id_producto: req.params.id,
				id_carrito: req.session.user.carrito
			}
		});
		let producto = await db.productos.findByPk(req.params.id)
		funcionesGenericas.newLog(`Se elimino el producto ${producto.nombre} del carrito\n`)
		return res.json({estatus : 0});
	},
	//? Modificar cantidad de elementos del carrito
	modificarCarrito: async (req, res) => {
		let producto = await db.productos.findByPk(req.params.id); 
		await db.carritoProducto.update(
			{
				cantidad: req.query.cant
			},
			{
				where: {
					id_producto: req.params.id,
					id_carrito: req.session.user.carrito
				}
			}
		);
		funcionesGenericas.newLog(`Se modifico la cantidad del producto ${producto.nombre} del carrito a ${req.query.cant}\n`)
		return res.json({estatus : 0});
	}
};

module.exports = controlador;
