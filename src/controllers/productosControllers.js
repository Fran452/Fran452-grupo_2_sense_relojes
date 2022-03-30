const path = require("path");
let productos = [
    {
        id : 1,
        nombre : "Onix",
        tipo : "reloj",
        modelo : "Silver",
        img : "Onix S.jpg",
        precio : 1700,
        descripcion : "es un porducto miy lindo y bla bal bla con mucho ams vla bla bla y todo eso con mas bla bla bla",
        cantidad: 5,
        formaDePago: ["efectivo"],
        datosDestacados: ["diametro: 25", "material: oro", "correa: cuero" ]
    },
    {
        id : 2,
        nombre : "Onix v2",
        tipo : "reloj",
        modelo : "Silver",
        img : "Onix S.jpg",
        precio : 1700,
        descripcion : "es un porducto miy lindo y bla bal bla con mucho ams vla bla bla y todo eso con mas bla bla bla",
        cantidad: 5,
        formaDePago: ["efectivo"],
        datosDestacados: ["diametro: 25", "material: oro", "correa: cuero" ]
    },
    {
        id : 3,
        nombre : "Onix v3",
        tipo : "reloj",
        modelo : "Silver",
        img : "Onix S.jpg",
        precio : 1700,
        descripcion : "es un porducto miy lindo y bla bal bla con mucho ams vla bla bla y todo eso con mas bla bla bla",
        cantidad: 5,
        formaDePago: ["efectivo"],
        datosDestacados: ["diametro: 25", "material: oro", "correa: cuero" ]
    },
]

const controlador = {
    index:(req,res) => {res.render("productosGeneral",{productos})},
    id:(req,res) => {
        let productoSeleccionado = productos.find(producto => producto.id == req.params.id )
        res.render("productDetail",{producto:productoSeleccionado})
    },
    create: (req,res) => {res.render("agregarProducto")},
    editProduct: (req,res) => {res.render("modificarproducto")}
}
module.exports = controlador;

