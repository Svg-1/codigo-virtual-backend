"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listarProductos = exports.crearProducto = void 0;

var _relaciones = require("../config/relaciones");

//CRUD:
const crearProducto = async (req, res) => {
  //Cuando creamos un nuevo registro este retornará el registro creado en la BD.
  //En sequelize hay 2 formas de crear (agregar) un nuevo registro y es: 
  //await Modelo.create(data)=> va a crear el nuevo registro en la BD y retornará su data creada.
  // Modelo.build() => todavia no crea el registro en la BD, hace la validacion de que todos los campos, se cumplan, va de la mano con .save() este si retorna una promesa y esto se usa para hacer una pre-configuracion de los campos antes de guardarlos en la BD. 
  try {
    //validacion
    //https://eloquentjs-es...libro java 
    //expresion regular para solamente texto mayus, minus, y espacios.
    const validacion = new RegExp(/^[a-zA-Z]+$/);

    if (validacion.test(req.body.productoNombre)) {
      const nuevoProducto = await _relaciones.Producto.create(req.body);
      return res.status(201).json({
        success: true,
        content: nuevoProducto,
        message: "Producto cfreado exitosamente"
      }); //cuando creamos un nuevo registro este retornará el registro creado en la BD
    } else {
      return res.status(400).json({
        success: false,
        content: null,
        message: "Nombre de producto incorrecto"
      });
    }
  } catch (error) {
    return res.status(500).json({
      succes: false,
      content: error,
      message: "Hubo un error al registrar un producto"
    });
  }
};

exports.crearProducto = crearProducto;

const listarProductos = async (req, res) => {
  try {
    const productos = await _relaciones.Producto.findAll();
    return res.json({
      success: true,
      content: productos,
      message: null
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
      message: "Error al devolver los productos"
    });
  }
};

exports.listarProductos = listarProductos;