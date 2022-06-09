const express = require("express");
const path = require("path");
const productoController = require("../controllers/productosControllers");
const multer = require("multer")
const router = express.Router();
const middleware = require("../middlewares/userMiddlewares")

//***************** MULTER ********************/
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
      cb(null, path.join(__dirname,'../../public/img/product'))
      },
    filename: (req,file,cb) => {
      let name =   Date.now() + path.extname(file.originalname);
      cb(null, name)
      }
  })
  
let fileUpload = multer({storage: storage});

//****************  Rutas ******************/

// Producto general
router.get('/',productoController.index);

// Creacion de producto

router.get('/new',productoController.create);
router.post('/new',fileUpload.any('img'),productoController.createFuction);


// Detalle de producto
router.get('/:id',productoController.id);

// Edicion de producto
router.get('/:id/edit',middleware.admin,productoController.editProduct);
router.put('/:id/edit',productoController.editProductFuction);

// Eliminar producto
router.delete('/:id/delete',middleware.admin,productoController.delete)


module.exports = router