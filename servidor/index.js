const morganFreeman = require("morgan");
const express = require("express");
const { error404, errorGeneral } = require("./errores");
const app = require("./init");
const rutasAlumnos = require("./rutas/alumnos");

app.use(morganFreeman("dev"));
app.use(express.json());

app.use("/alumnos", rutasAlumnos);

app.use(error404);
app.use(errorGeneral);
