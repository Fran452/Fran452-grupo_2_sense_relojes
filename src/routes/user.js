const express = require("express");
const {body} = require("express-validator");
const path = require ("path");
const multer = require ("multer");
const router = express.Router();
const userController = require("../controllers/userController");
const middleware = require("../middlewares/userMiddlewares");
const funcionesGenericas = require("../generalFuction");
const db = require("../database/models")

/****************  Validaciones ****************/ 
const validaciones = [
    body("nombre").isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body("email").isEmail().withMessage('El campo debe ser un email').custom(async(value) => {
        let userInDb = await db.usuarios.findOne({where:{email: value}})
        console.log(userInDb?.id);
        if(userInDb?.id){
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
// Home: Login
router.get('/',userController.login);

// Registro
router.get('/register',middleware.redirectPerfil,userController.crear);
router.post('/',upload.single("img"),validaciones,userController.newUser);

// Login
router.get('/login',middleware.redirectPerfil,userController.login);
router.post('/login',userController.loginFuction);

// Perfil
router.get('/perfile',middleware.userRegister,middleware.guardarRegistro,userController.detalle);

// Edicion
router.get('/:id/editar',userController.editar);

// Salir
router.get('/salir',userController.salir);

/************************************ Carrito ***********************************/
// Agregar al carrito
router.get('/addCarrito/:id', userController.addCarrito);

// Eliminar del carrito
router.get('/deleteProduc/:id',middleware.userRegister, userController.elinarCarrito);

// Modificar cantidad
router.post('/cantidadCarrito/:id',middleware.userRegister, userController.modificarCarrito);

module.exports = router