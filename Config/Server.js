// yarn add express: con esta se crea yarn lock
// como se importó nodemon cambiar const required por import para importar express y aumentar export en class server.
import express from "express";
import {tareas_router} from "../rutas/tareas";
import {json} from "body-parser";

export class Server{
    constructor (){
        this.app = express()
        this.puerto = process.env.PORT || 8000;
        this.app.use(json());
        this.rutas();
    }
    rutas(){
        this.app.get('/', (rep, res)=> {
            res.send("Hola, bienvenido a mi API'😍");
        });
//este crea un middleware (también sirve para indicar un conglomerado de rutas)
        this.app.use(tareas_router) 
    }
    iniciarServidor(){
        //el método listen sirve para levantar un servidor en express.
        this.app.listen(this.puerto,()=>{
            console.log (`Servidor corriendo exitosamente: 127.0.0.1:${this.puerto}`);
        });
    }
}

module.exports ={
    Server,
};