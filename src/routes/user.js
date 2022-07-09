const express = require("express");
const {body} = require("express-validator");
const path = require ("path");
const multer = require ("multer");
const router = express.Router();
const userController = require("../controllers/userController");
const middleware = require("../middlewares/userMiddlewares");

/****************  Validaciones ****************/ 
const validaciones = [
    body("nombre").isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body("email").isEmail().withMessage('El campo debe ser un email').custom((value) => {
        let userInDb = funcionesGenericas.archivoJSON(db) 
        let mailRepetido = userInDb.find(user => value == user.email);
        if(mailRepetido){
            throw new Error('Mail ya utiliado');
        }
        return true;
    }),
    body("telefono").isLength({ min: 10 }).withMessage('El telefono debe contar con a menos 10 caracteres'),
    body("fechaDeNacimiento"),
    body("fotoDeUsuario"),
    body("contraseña").isLength({ min: 8 }).withMessage('la contraseña debe tener al menos 8 caracteres'),
    body("contraseñaConfirm").custom((value, { req }) => {
        if (value !== req.body.contraseña) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }).withMessage('Las contraseñas no coinciden'),
]
 
/****************   Multer  ****************/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve (__dirname,"../../public/img/user"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname ( file.originalname))
  }
})

const upload = multer({storage});

/****************  Rutas ******************/
router.get('/',userController.login);

router.get('/register',middleware.redirectPerfil,userController.crear);
router.post('/',upload.single("img"),validaciones,userController.newUser);

router.get('/login',middleware.redirectPerfil,userController.login);
router.post('/login',userController.loginFuction);

router.get('/perfile',middleware.userRegister,userController.detalle);
/*router.post('/login',userController.fuctionloLogin);*/

// Edicion
router.get('/:id/editar',userController.editar);

// Agregar al carrito
router.get('/addCarrito/:id',middleware.userRegister, userController.addCarrito);

// Agregar al carrito
router.get('/deleteCarrito/:id',middleware.userRegister, userController.elinarCarrito);

module.exports = router