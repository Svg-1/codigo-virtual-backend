import Server from "../config/server";
import {Usuario} from "../models/usuario";
import * as faker from "faker";

const getRandomColor = () => {
    const randomColor = Math.floor (Math.random () * 16777215).toString(16);
    return `#${randomColor}`;
};

export const ingresarCoordenada = async (data) =>{
    //Creo la instancia de mi servidor, y gracias al patrón Singleton si ya hay una instancia creada, no creará y se reusrá la que ya está creada.
    const objServidor = new Server () 
    //de la información que me está enviando mi cliente del socket, extraeré la posición x, posición y , y el nombre del usuario.
    const { x, y } = data;
    //buscaré según el nombre del usuario, sus coordenadas
    try {
       const usuario = await Usuario.findOne({ nombre: cliente.id });
        // si no existe el usuario entonces haré lo siguiente:
       if (!usuario) {
           //creo el nuevo usuario con su nombre, y le registro las coordenadas iniciales:
        await Usuario.create({
            nombre: cliente.id,
            color: getRandomColor(), //para que cada usuario tenga un color diferente.
            coordenadas: [{x,y}],
        });
        } else {
            //agrego a ese registro de coordenadas , las últimas coordenadas mandadas por el socket.
        usuario.coordenadas.push({
             x,
             y,
        });
    
   //actualizo el ususario con las nuevas coordenadas mandadas ´por el socket
await Usuario.finOneUpdate(
    {nombre: usuario_nombre}, 
    {coordenadas }
    );
}
//ahora buscamos todos los usuarios para devolver con sus coordenadas
const usuarios = await Usuario.find();
//emito el evento para que todos los clientes conectados los cambios en tiuempo real.
cliente.ibroadcast.emit("coordenadas", usuarios);
}catch(error){
    console.log(error);
}
};
