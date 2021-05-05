import { Usuario } from "../config/relaciones";

export const registro = async (req, res) => {    
    try {
//vamos a utilizar la creacion en dos pasos
        const {password} = req.body;
        const nuevoUsuario = Usuario.build(req.body);
        //con esto ya hemos encriptado la contraseña de texto plano a un HASH.
        nuevoUsuario.setearPassword(password);
        await nuevoUsuario.save();
        return res.status(201).json({
            succes:true,
            content: nuevoUsuario,
            message: "Usuario creado exitosamente",
    });
    
} catch (error) {
    return res.status(500).json({
        succes: false,
        content: error,
        message: 'Error al crear el usuario'
    });
  }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    //ver si hay un usuario con ese correo.
    try {
        const usuarioEncontrado = await Usuario.findOne({
            where: {
                usuarioCorreo: email,
            },
        });
        if (!usuarioEncontrado) {
            return res.status(404).json({
                succes: false,
                content: null,
                message: "Ususario no encontrado",
            });
        }
        const resultado = usuarioEncontrado.validarPassword(password);
        if (resultado) {
            return res.json({
            success: true,
            content: ususarioEncontrado.generarJWT(),
            message: "Bienvenido",            
        });
    } else {
        return res.status(400).json({
            succcess: false, 
            content: null,
            message: "Contraseña incorrecta",
        });
    }
} catch (error) {
    return res.status(500).json({
        success: false,
        content: error, 
        message: "Error al hacer login",
    });
}
};