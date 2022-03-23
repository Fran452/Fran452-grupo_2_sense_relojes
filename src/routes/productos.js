const express = require("express");
const productoController = require("../controllers/productosControllers");

const router = express.Router();

router.get('/',productoController.index);

router.get('/:id',productoController.id);

module.exports = router