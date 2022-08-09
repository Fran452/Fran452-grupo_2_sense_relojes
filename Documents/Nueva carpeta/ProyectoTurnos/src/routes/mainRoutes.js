const express = require("express");
const mainController = require("../controllers/mainController")
const router = express.Router();
router.get('/',mainController.index);
router.get('/listadoDeTurnos',mainController.listadoDeTurnos);
router.get('/admin/turno',mainController.turno);
module.exports = router;