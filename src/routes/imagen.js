import {Router} from "express";
import * as imagen_controller from "../controllers/usuario";
import Multer from "multer";
export const usuario_router = Router();
//configurar el middleware de multer
const multer = Multer({
    storage: Multer.memoryStorage(), //con esta opcion le indicamos que se almacenará el archivo de manera temporal en el archivo volatil 
    limits: {
       // es una expresion en unidad de medida BYTES
    // byte * 1024 = kilobyte * 1024 = megabyte * 1024 = gigabyte * 1024 = terabyte * 1024
    fileSize: 5 * 1024 * 1024, // 5 Mb
  },
});

export const imagen_router = Router();

// https://www.npmjs.com/package/multer#singlefieldname
imagen_router.post(
  "/subirImagen",
  multer.single("imagen"),
  imagen_controller.subirImagen
);