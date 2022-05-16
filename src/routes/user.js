const express = require("express");
const {body} = require("express-validator")
const path = require ("path")
const multer = require ("multer")
const router = express.Router();
const userController = require("../controllers/userController");

const funcionesGenericas = require("../generalFuction");
const db = path.join(__dirname,"../database/clientes.json");

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
      console.log("value : ",value);
      console.log("password : ",req.body.contraseña);
        if (value !== req.body.contraseña) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }).withMessage('Las contraseñas no coinciden'),
]
 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve (__dirname,"../../public/img/user"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname ( file.originalname))
  }
})

const upload = multer({ storage});


router.get('/',userController.login);

router.get('/register',userController.register);
router.post('/',upload.single("fotoDeUsuario"),validaciones,userController.processRegister);

router.get('/login',userController.login);
router.post('/login',userController.fuctionLogin);

router.get('/perfile',userController.perfile);

module.exports = router