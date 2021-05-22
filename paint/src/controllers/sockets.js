import Server from "../config/server";
import {Usuario} from "../models/usuario";

export const ingresarCoordenada = async (data) =>{
    //Creo la instancia de mi servidor, y gracias al patrón Singleton si ya hay una instancia creada, no creará y se reusrá la que ya está creada.
    const objServidor = new Server () 
    //de la información que me está enviando mi cliente del socket, extraeré la posición x, posición y , y el nombre del usuario.
    const {x, y, usuario_nombre} = data;
    //buscaré según el nombre del usuario, sus coordenadas
    const {coordenadas} = await Usuario.findOne({nombre: usuario_nombre});
    //agrego a ese registro de coordenadas, las últimas coordenadas enviadas por el socket.
usuario.coordenadas.push({
    x,
    y,
});
await Usuario.finOneUpdate({nombre: usuario_nombre}, {coordenadas });
//ahora buscamos todos los usuarios para devolver con sus coordenadas
const usuarios = await Usuario.find();
objServidor.io.emit("coordenadas", usuarios);
};