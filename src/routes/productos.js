const express = require("express");
const productoController = require("../controllers/productosControllers");

const router = express.Router();

router.get('/',productoController.index);



router.get('/newProduct',productoController.create);

router.get('/:id',productoController.id);


router.get('/:id/editProducto',productoController.editProduct);
/*
router.get('/:id',productoController.productFinish);
*/

module.exports = router