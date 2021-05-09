const nombre = document.getElementbyId("inputNonmbre");
const apellido = document.getElementbyId("inputApellido");
const sexo = document.getElementbyId("inputSexo");
const direccion = document.getElementbyId("inputDireccion");
const fotografia = document.getElementbyId("inputFotografia");
const telefono = document.getElementbyId("inputTelefono");
const registrar = document.getElementbyId("Registrar");
const BASE_URL = "https://127.0.0.1:8000";

//esstso me sirve paras ubir la imagen al back
const formData = new FormData();
registrar.addEventListener("click", async (e) => {
    e.preventDefault();
    //el input de tipo fiule siempre guarda los archivos que seleccionamos en un array, aun asi será un único archivo.
    
    console.log(fotografia.files[0]);
    formData.append("imagen", fotografia.files[0]);
    const resultadao = await fetch(BASE_URAL + "./subirImagen", {
        method: "POST",
        body: formData,
        //esto no sirve, es solamente es para indicar como sería en el caso que necesitamos indicar un JWT o algún método de ...
        headers: {
            Authorization: "Bearer 1265337283723.5427zf728hd8992.92384974843727374834f", //esto es simulacion de envio de token para que usuario grabe su contraseña para ingresa.            
        },
    });
    const json = await resultado.json();
    console.log(json);
});
