const express = require("express");
const user = require("../apis/routes/userApis")
const product = require("../apis/routes/productApis")

const router = express.Router();

router.use('/users',user);

router.use('/product',product);

module.exports = router