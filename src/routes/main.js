const express = require("express");
const mainController = require("../controllers/mainControllers")

const router = express.Router();

router.get('/',mainController.index);
router.get('/carrito',mainController.carrito);

module.exports = router