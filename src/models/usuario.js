require ("dotenv").config();
import {DataTypes} from "sequelize";
import {conexion} from "../config/sequelize";
import {hashSync, compareSync} from "bcrypt";
import {sign} from "jsonwebtoken";

// Para ver las validaciones disponibles => https://sequelize.org/master/manual/validations-and-contraints.html#per-atribute-validations

export default () => {
    let usuario = conexion.define(
        "usuario",
    {
       usuarioId: {
           field: 'id',
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           unique: true,
           allowNull: false,
       },
       usuarioNombre: {
           field: 'nombre',
           type: DataTypes.STRING (25),
       },
       usuarioApellido: {
           field: 'apellido',
           type: DataTypes.STRING(25),        
       },
       usuarioCorreo:{
           field: 'correo',
           type: DataTypes.STRING(25),
           unique: true,
           validate:{
               isEmail: true
           },
       },
       usuarioPassword:{
           field: "password",
           type: DataTypes.TEXT,
       },
   },
   {
       tableName: "usuarios",
       timestamps: false,
        }
    );
/**Aqui irá la encriptación y algunos otros métodos PROPIO DEL MODELO */
    usuario.prototype.setearPassword = function(password) {
        const hash = hashSync(password,10);
        this.usuarioPassword = hash;
    };
    usuario.prototype.validarPassword = function (password) {
        //compara la contraseña entrante con el Hash guardado en la BD, si la contraseña es correcta retorna true, si no es correcta retorna false.
        return compareSync(password, this.usuarioPassword);
    };
    usuario.prototype.generarJWT = function() {
        //el payload es la parte en la cual podemos agregar infromacion adicional para que el front la pueda utilizar a su conveniencia ( no se necesita desencriptar nada, no necesita contraseña)
        const payload = {
            usuarioId: this.usuarioId,
            usuarioCorreo: this.usuarioCorreo,            
        };
        //luego indico la firma que va a servir para encriptaar la JWT
        return sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"});
        };
        return usuario;
    };
    