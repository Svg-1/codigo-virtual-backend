//@google-cloud-> Librería que nos permite manipular nuestro storage de firebase:
import {Storage} from "@google-cloud/storage";
//inicializamos el objeto de firebase para poder conectarnos al almacenamiento (bucket)
const storage = new Storage({
    projectId: " florescodigo-47d4b",
    keyFilename: "./credenciales_firebase.json",
});

//ahora creamos la isntancia de nuestro storage
const bucket = storage.bucket("florescodigo-47d4b.appspot.com")

export const subirArchivo = (archivo) => {
    return new Promise ((resuelto, rechazo) => {
        //validamos que tengamos una rchivo que subir.
        if(!archivo) return rechazo ("No se encontro el archivo");
        //crea la instancia de nuestro archivo en firebase y adicionalmente a ello nos retorna métodos para manipular dicho archivo.
        const file = bucket.file(archivo.originalname);
        //agregamos la configuración dicional de nuestro archivo como su extensión y formato.
        const blobStream = file.createWriteStream({
            metadata:{
                contentType: archivo.mimetype,
            },
        });
        //el proceso de subida se genera en un segundo plano meadiante el cual se controla en estados. 
        blobStream.on("error", (error) => {
            return rechazo(error);
        });
        blobStream.on("finish", () => {
            // ingresará a este arrow function cuando el archivo termine de subir exitosamente.
            //getSignedUrl sirbe para que nos brinde firebase una ruta para acceder a nuestro archivo fuera del storage.
            file
            .getSignedUrl({
                action: "read",
                expires: "12-31-2021", //mes/dia/año.
            })
            .then((link) => {
                return resuelto(link);
            })
            .catch ((error) => {
                return rechazo(error);
            });
        });
        //culmino el proceso de conexion con firebase
        //le mando el contenido del archivo.
        //en si, este es el inicio y fin de la conexioncon firebase, luego recien viene los estados de más arriba.
        blobStream.end(archivo.buffer);
    });
};

export const eliminarArchivo = (nombreArchivo) => bucket.file(nombreArchivo).delete();