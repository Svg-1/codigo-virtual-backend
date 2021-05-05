"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchmen = void 0;

var _jsonwebtoken = require("jsonwebtoken");

//para poder usar las variables declaradas en el archivo .env en este archivo debemos declarar lo sgt: 
require("dotenv").config();

const verificarToken = token => {
  try {
    //el método usar la contraseña para ver si la tpoken es la correcta, si tiene tiempo de vida y si es una token válida(tiene un buen formato) caso contrario saltará el catch.
    const payload = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET); //si la token esta buena no retornará el payload de dicha token

    return payload;
  } catch (error) {
    //si la token no es valida (pa password no concuerda o si ya expiró) con la llave message enn la cual indicará la razón del proqué.
    return error.message;
  }
};

const watchmen = (req, res, next) => {
  if (!req.headers.authorization) {
    //si no está correctamente autorizado
    return res.status(401).json({
      success: false,
      content: null,
      message: "Se necesita un token para esta ruta"
    });
  } //Bearer 123123asdfads.3423k4j2kl3j4.sd908zx0csa autorizacion


  const token = req.headers.authorization.split(" ")[1];
  const resultado = verificarToken(token);

  if (typeof resultado === "object") {
    next();
  } else {
    return res.status(401).json({
      succes: false,
      content: resultado,
      message: "No estás autorizado para realizar esta solicitud"
    });
  }
};

exports.watchmen = watchmen;