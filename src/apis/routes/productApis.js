const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productControllers")

router.get('/',productosController.index);

router.get('/productos',productosController.productos);

router.get('/:id',productosController.detalle);



module.exports = router