const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");



router.get('/register',userController.crear);
router.post('/register',userController.newUser)

router.get('/',userController.login);
router.get('/login',userController.login);
/*router.post('/login',userController.fuctionloLogin);*/

// Detalle
router.get('/:id',userController.detalle);

// Edicion
router.get('/:id/editar',userController.editar);



module.exports = router