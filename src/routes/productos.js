const express = require("express");
const productoController = require("../controllers/productosControllers");

const router = express.Router();


router.get('/',productoController.index);

router.get('/:id',productoController.id);

router.get('/newProduct',productoController.create);
//router.post('/newProduct',productoController.createFuction)

router.get('/:id/editProducto',productoController.editProduct);
//router.put('/:id/editProducto',productoController.editProductFuction);

//router.delete('/:id/delete',productoController.delete)

module.exports = router