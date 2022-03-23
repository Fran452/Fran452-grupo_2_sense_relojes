const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productosControllers");


router.get('/',productoController.index);

router.get('/id:',productoController.id);