"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _sequelize2 = require("../config/sequelize");

//DataTYpes => sequelize.org/master/manual/model-basics.html
//Opciones para poner a las columnas => https://sequelize.org/master/manual/model-basics.html#column-options
var _default = () => _sequelize2.conexion.define("producto", //nombre del modelo
{
  productoId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    field: 'id'
  },
  productoNombre: {
    type: _sequelize.DataTypes.STRING(45),
    field: "nombre"
  },
  productoPrecio: {
    type: _sequelize.DataTypes.DECIMAL(5, 2),
    field: "precio"
  }
}, {
  tableName: "productos",
  timestamps: true,
  // su valor por defecto es true.
  //estos son campos de auditoria, se crean dos columnas createdAt, updatedAt, el createdAt => se va a registra la hora actual en la cual se creó este registro.       //updatedAt: va a guardar la hroa acutal cuadno cualquier campo de este registro se modifique.
  createdAt: "fecha_creacion",
  updatedAt: "ultima_modificacion"
});

exports.default = _default;