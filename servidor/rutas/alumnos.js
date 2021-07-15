const { check, validationResult, checkSchema } = require("express-validator");
const express = require("express");

const router = express.Router();

router.get(
  "/alumno/:idAlumno/:dniAlumno?",
  check("idAlumno", "Id incorrecta").isMongoId(),
  check("dniAlumno", "DNI incorrecto").optional().isIdentityCard("ES"),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      console.log(errores.array());
      const nuevoError = new Error(errores.array().map((error) => error.msg));
      nuevoError.codigo = 400;
      return next(nuevoError);
    }
    next();
  },
  (req, res, next) => {
    res.send(`Datos del alumno ${req.params.idAlumno}`);
  }
);

router.post(
  "/alumno/nuevo-alumno",
  checkSchema({
    nombre: {
      isAlpha: true,
      errorMessage: "El nombre del alumno sólo puede llevar letras",
    },
    nota: {
      errorMessage: "La nota debe ser un número entre 0 y 10",
      isFloat: {
        options: {
          min: 0,
          max: 10,
        },
      },
    },
    contrasenya: {
      isStrongPassword: true,
      errorMessage: "Menuda basura de contraseña",
    },
  }),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      console.log(errores);
      const nuevoError = new Error(
        JSON.stringify(errores.array().map((error) => error.msg))
      );
      nuevoError.codigo = 400;
      return next(nuevoError);
    }
    next();
  },
  (req, res, next) => {
    res.send("Se ha creado el nuevo usuario");
  }
);

module.exports = router;
