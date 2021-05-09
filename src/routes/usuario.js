import {Router} from "express";
impor * as usuario_controller from "../controllers/usuario";

export const usuario_router = Router();

usuario_router.route("/usuarios").post(usuario_controller.crearUsuario);


