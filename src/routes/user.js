const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");



router.get('/register',userController.register);
/*router.post('/register',userController.newUser);*/

router.get('/',userController.login);

router.get('/login',userController.login);
/*router.post('/login',userController.fuctionloLogin);*/

router.get('/paginausuario',userController.paginausuario);
/*router.post('/login',userController.fuctionloLogin);*/

module.exports = router