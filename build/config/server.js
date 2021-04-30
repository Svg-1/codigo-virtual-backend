"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _sequelize = require("./sequelize");

var _producto = require("../routes/producto");

var _usuario = require("../routes/usuario");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Server {
  constructor() {
    this.app = (0, _express.default)(); //definimos el puerto que por lo general es una variable de entorno ( esto solo se da en servidores de produccion como: HEROKU, DIGITAL OCEAN, AZURE) en el caso que no encontrase esa variable de entorno, usará el número definido 8000.        this.port = process.env.PORT || 8000;

    this.port = process.env.PORT || 8000;
    this.bodyParser();
    this.rutas();
  }

  bodyParser() {
    //sirve para configurar la forma en la cual el API va a recibir datos del front mediante el body.
    this.app.use((0, _bodyParser.json)());
  }

  rutas() {
    this.app.use(_producto.producto_router);
    this.app.use(_usuario.usuario_router);
    this.app.use(categoria_router);
    this.app.get("/", (req, res) => res.send("Bienvenido a mi API"));
  }

  start() {
    //sirve para levantar el servidor en el cual le tenemos que pasar el puerto y si todo es exitoso ingresaremos al callbacks(segundo parametro)
    this.app.listen(this.port, async () => {
      console.log(`Servidor corriendo en: http://127.0.0.1${this.port}`);

      try {
        //esto va a tratar de concectarse con el servidor usando las credenciales definidas anteriormente.
        //alter => si hubo alghún cambio en la BD volverá a generar SOLAMNETE esos cambios.
        //force => RESETEA (borra) toda la BD y su contenido y lo vuelve a crear de 0, NUNCA USAR FORCE EN MODO PRODUCCIÓN !! se pierde toda la info.
        await _sequelize.conexion.sync({
          force: false
        });
        console.log("Base de datos sincronizada correctamente");
      } catch (error) {
        console.error(error);
      }
    });
  }

}

exports.default = Server;