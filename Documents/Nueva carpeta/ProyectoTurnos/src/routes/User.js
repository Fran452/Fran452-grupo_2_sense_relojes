const express = require("express");
const {body} = require("express-validator")

const router = express.Router();
const userController = require("../controllers/userController");
const validaciones = [
    body("nombre").isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body("email").isEmail().withMessage('El campo debe ser un email'),
    body("telefono").isLength({ min: 10 }).withMessage('El telefono debe contar con a menos 10 caracteres'),
    body("fechaDeNacimiento"),
    body("contraseña").isLength({ min: 8 }).withMessage('la contraseña debe tener al menos 8 caracteres'),
    body("contraseñaConfirm").custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      }).withMessage('Las contraseñas no coinciden'),
]


/*router.post('/',validaciones,userController.newUser);*/

router.get('/login',userController.login);
router.post('/login',userController.login);



module.exports = router