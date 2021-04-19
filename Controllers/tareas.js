//Un controlador Es el encargado de 
const tareas = [
    {
        nombre: "Hacer el foro",
        estado: true,
},
{
    nombre: "Hacer el ejercicio de Flask",
    estado: false,
},
];
//CRUD
//siempre todo controlador recibe un REQUEST (req) y un RESPONSE (res) ADICIONALMENTE A ELLO si usamos

//el requesta es todo lo que me va a mandar el cliente.
//El response es la fomra en la cual le voyb a responder al cliente
//se puede responder mediante un (.json ())un texto (.send()) un estado (.status())
export const crearTarea = (req, res) => {
    console.log (req.body);
    return res.json ({
        content: tareas[tareas.length - 1],
    });    
};

export const ListarTareas = (req, res) => {
    return res.json({
        content: tareas,
    });
    
};
export const ListarTareasPorId = (req, res) =>{
//mediante el id mandado por la url buscar si existe esa posición en el arreglo tareas y si la hay mostrar el contenido, caso contrario, indicar que no se encuentra esa tarea.
    console.log(req.params);
    const{id}= req.params;
    if (tareas[id - 1]) { //se coloca -1 porque nadie busca la posición 0 si no desde 1.
        return res.json({
            content: tareas[id - 1],
        });
    } else {
        return res.status(404).json({ //en express se coloca el estado asi: status(404) antes json despues de res.
            message: "Not found",
        });
    }   
};