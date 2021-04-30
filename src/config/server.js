import express from "express";
import {json} from "body-parser";

export default class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8000;
        this.body = Parser();        
    }
    bodyParser(){
        this.app.use(json());        
    }
    start (){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en: http://127.00.1${this.port}');
        })
    }
}