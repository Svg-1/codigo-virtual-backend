// yarn add express: con esta se crea yarn lock
const express = require ("express")

class Server{
    constructor (){
        this.app = express()
        this.puerto = process.env.PORT || 8000;
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