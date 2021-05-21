const socket = io("http://127.0.0.1:5000");
const nombre = document.getElementById("nombre");
const ingresar = document.getElementById("ingresar");
const listaUsuarios = document.getElementById("lista-usuarios");
const mensaje = document.getElementById("mensaje");
const listaMensaje = document.getElementById("lista-mensajes");

socket.on("connect", () => {
    console.log("Me conecté al socket del back!");
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
});