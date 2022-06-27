const express = require("express");
const router = express.Router();
const userController = require('../controllers/userControllersApis');

router.get('/',userController.users);
/*
router.get('/:id',userController.detalle);
*/
module.exports = router