const socket = io("http://127.0.0.1:5000");
const nombre = document.getElementById("nombre");
const ingresar = document.getElementById("ingresar");
const listaUsuarios = document.getElementById("lista-usuarios");
const mensaje = document.getElementById("mensaje");
const listaMensaje = document.getElementById("lista-mensajes");

socket.on("connect", () => {
    console.log("Me conecté al socket del back!");
});
//Conectando con backend pafra saber el id del cliente:
socket.on("cliente", (cliente) =>{
    console.log(cliente);    
});

ingresar.onclick = (e) => {
    e.preventDefault();
    ingresar.disabled = true; //para desabilitar botón ingresar contacto
    nombre.disabled = true;   //para desabilitar botón ingresar nombre
    socket.emit("configurar-cliente", nombre.value);    
};

socket.on("lista-usuarios", (usuarios)=> {
    console.log("La lista de usuarios es:");
    console.log(usuarios);
    listaUsuarios.innerHTML = "";
  for (const key in usuarios) {
    const usuarioLi = document.createElement("li");
    usuarioLi.className = "list-group-item";
    usuarioLi.innerText = usuarios[key].nombre;
    listaUsuarios.appendChild(usuarioLi);
  }
});
//Imprime en consola cuando le demos enter en el input del mensaje:
mensaje.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        socket.emit("crear-mensaje", mensaje.value);
        console.log(mensaje.value);
        mensaje.value = ""; //aumentar para limpiar, dice:.. enviado fecha
    }
});

//enviando mensaje de backend objeto cliente en lugar de io.
socket.on("Lista-mensajes", (mensajes) => {
    console.log(mensajes);
//Para que salga dice: texto enviado el ::fecha:
    listaMensaje.innerHTML = " ";     
     mensajes.forEach((mensaje) =>{
         console.log(mensaje);
         const mensajeLi = document.createElement("Li")
         mensajeLi.innerText = `${mensaje.nombre} dice: ${mensaje.mensaje} 
         . Enviado el ${mensaje.fecha}`;
         listaMensaje.appendChild(mensajeLi);
     });
});