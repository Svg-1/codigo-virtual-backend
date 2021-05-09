import {subirArchivo} from "../utils/manejadorArchivosFirebase";

export const subirImagen = (req, res) =>{
    //si subimos un solo archivo (single) usaremos el parámetro <<req.file>>, caso contrario, si subimos varios archivos (array) usaremos el parámetro <<req.files>>
    try{ 
        const link = await subirArchivo(req.file);
        return res.status(201).json({
            succes: true,
            content: link,
            message: "Imagen subida exitosamente",
        });
    }catch (error) {
        return res.status(500).josn({
            success: false,
            content: error, 
            message: "Error al subir la imagen",
        });
    }
};

export const eliminarImagen = async (req, res) => {
    //ruta ... con parámetros dinámicos, me lo envia el front, se usan para búsuqedas, paginascion, filtros avanzados.(dependiendo de lo que me mandes, con eso te busco)
    console.log(req.query);
    const {nombre} = req.query; //destructuracion de un json 
    //const nombre= req.query.nombre;
    try{
        const resultado = await eliminarArchivo(nombre);
        return res.json({
            success: true,
            content: resultado,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            content: error,
        });
    }
};