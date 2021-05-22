import express from "express";
import { Server as ServerHttp } from "http";
import socketio from "socket.io";
import { json } from "body-parser";


export default class Server {

constructor() {
    this.app = express();
    this.puerto = process.env.PORT || 5000;
    this.httpServer = new ServerHttp(this.app);
    this.io = socketio(this.httpServer, {
        cors: {            
            //https://socket.io/docs/v4/handling-cors/
            origin: "*", //esto indica que todos los dominios pueden acceder.            
            methods: ["GET", "POST", "PUT"], //es lo mismo que: Access-Control-Allow-Methods", "GET, POST, PUT
            allowedHeaders: ["Content-Type"], //es lo mismo que: Access-Control-Allow-Headers", "Content-Type, Authorization - Para indicar qeu tipo de cabceras pueden ser enviadas a mis servicio Rest

        },
    });
    //despues de definir los métodos: llamarlos:
    this.cors();
    this.bodyParser();
    this.rutas();
    this.configuracionSockets();

    }
    bodyParser() {
        this.app.use(json())
    }
    //definir método rutas, métodfo cors y método start:
    rutas(){
        this.app.get("/", (req, res) => {
            res.json({
                message: "Bienevenido a mi API de sockets",
            });
        });
    }
    cors() {
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
            next();
        });
    }
    configuracionSockets() {
        let usuarios = [];
        let mensajes = [];
        this.io.on("connect", (cliente) => {   //metodo on: cuando un cliente se conecte, para recibirlo
            //el método connect: se llamará cuando un cliente se conecte al servicio de sockets.         
        console.log("SE CONECTÓ EL CLIENTE:");
        console.log(cliente.id);

        cliente.on("configurar-cliente", (nombre) => {
            console.log(nombre);
            usuarios.push({
                id: cliente.id,
                nombre,
            });
            this.io.emit("lista-usuarios", usuarios);
        });
        cliente.on("disconnect", (motivo) => {
            console.log(`Se desconectó el cliente ${cliente.id}`);
            
            usuarios = usuarios.filter((usuario) => 
                usuario.id !== cliente.id);
                mensajes = mensajes.filter((usuarios) => usuario.id  //aumentar para limpiar, dice:.. enviado fecha
                !== cliente.id);
                console.log(usuarios);
                console.log(motivo);
                this.io.emit("lista-usuarios", usuarios);
                cliente.broadcast.emit("Lista-mensajes",mensajes);                       
        });
        //recibir el evento crear-mensaje e imprimir el mensaje enviado:
        cliente.on("crear-mensaje", (mensaje) => {
            //Para que salga dice: texto enviado el ::fecha
            const {nombre} = usuarios.filter(
                (usuario) => usuario.id === cliente.id
            ) [0];
       
            mensajes.push({
                id: cliente.id,
                nombre, //aumentar para limpiar, dice:.. enviado fecha
                mensaje, 
                fecha: new Date(),
            });
            //cuando llamamos al cliente en el cual estamos conectados y hacemos un emit (cliente.emit(...)) solamnete se va a emitir el evetno al mismo cliente. 
            //si llamamos al método cliente: broadcast.emit() hara un broadcast a todos los demás clientes conectados al socket EXCEPTUANDO al propio cliente que emitió el evento.
            //this.io.emit()=> emitirá el evetno a todos los clientes conectados al socket.
            //cleinte.emit("Lista-mensajes", mensajes);
            this.io.emit("Lista-mensajes", mensajes); //en lugar de llmaar al objeto io lo estamos llamando cliente. Para: 
         });
         //para saber el id del cleinte: 
         cliente.emit("cliente", cliente.id);

        this.io.emit("Lista-usuarios", usuarios); // con esto apenas se conecten los usuarios saldrá: Los usuarios están conectados.
      });      
      }
    
    start() {
    this.httpServer.listen(this.puerto, () => {
        console.log(
            `Servidor de sockets corriendo exitosamente en el puerto ${this.puerto}`
        );        
    });
}
}







