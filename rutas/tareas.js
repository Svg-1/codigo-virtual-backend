import  {Router} from "express" 
import {crearTarea, ListarTareas, ListarTareasPorId} from "../Controllers/tareas"

export const tareas_router = Router();

tareas_router.route("/tareas").post(crearTarea).post(crearTarea).get(ListarTareas);
//para hacer un parámetro x url DINAMICO simplemente definimos el nombre de esa variable pero con ":" para que express sepa que será dinámico.
tareas_router.route("/tarea/:id").get(ListarTareasPorId)