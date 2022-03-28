const express = require("express");
const productoController = require("../controllers/productosControllers");

const router = express.Router();

router.get('/',productoController.index);

router.get('/:id',productoController.id);

router.get('/newProduct',productoController.newProduct);
router.post('/newProduct',productoController.creation);
/*
router.get('/:id/editProducto',productoController.editProducto);
router.get('/:id',productoController.productFinish);
*/

module.exports = router