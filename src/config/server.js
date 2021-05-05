import express from "express";
import {json} from "body-parser";
import {conexion} from "./sequelize";
import {producto_router} from "../routes/producto";
import {usuario_router} from "../routes/usuario";
import {categoria_router} from '../routes/categoria'


export default class Server {
    constructor () {
        this.app = express ();
        //definimos el puerto que por lo general es una variable de entorno ( esto solo se da en servidores de produccion como: HEROKU, DIGITAL OCEAN, AZURE) en el caso que no encontrase esa variable de entorno, usará el número definido 8000.        this.port = process.env.PORT || 8000;
        this.port = process.env.PORT || 8000;
        this.bodyParser();
        this.rutas();
    }
    bodyParser() {
        //sirve para configurar la forma en la cual el API va a recibir datos del front mediante el body.
        this.app.use(json()) ;
    }
    rutas()
{
    this.app.use(producto_router);
    this.app.use(usuario_router);
    this.app.use(categoria_router);   
    this.app.get("/", (req, res) => res.send("Bienvenido a mi API"));
}

    start() {
        //sirve para levantar el servidor en el cual le tenemos que pasar el puerto y si todo es exitoso ingresaremos al callbacks(segundo parametro)
        this.app.listen(this.port, async() => {
            console.log (`Servidor corriendo en: http://127.0.0.1${this.port}`);
            try{
                //esto va a tratar de concectarse con el servidor usando las credenciales definidas anteriormente.
                //alter => si hubo alghún cambio en la BD volverá a generar SOLAMNETE esos cambios.
                //force => RESETEA (borra) toda la BD y su contenido y lo vuelve a crear de 0, NUNCA USAR FORCE EN MODO PRODUCCIÓN !! se pierde toda la info.
                await conexion.sync({force: false});
                console.log("Base de datos sincronizada correctamente")
            }catch (error) {
                console.error(error);
            }
        });
    }
}