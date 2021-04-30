//DataTYpes => sequelize.org/master/manual/model-basics.html
import { DataTypes } from "sequelize";
import {conexion} from "../config/sequelize";

//Opciones para poner a las columnas => https://sequelize.org/master/manual/model-basics.html#column-options
export default () => 
conexion.define (
    "producto", //nombre del modelo
{
    productoId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        field: 'id',
    },
    productoNombre:{
        type: DataTypes.STRING(45),
        field: "nombre",
    },
productoPrecio:{
    type: DataTypes.DECIMAL(5,2),
    field: "precio",
    }, 
},
    {
        tableName: "productos", 
        timestamps: true, // su valor por defecto es true.
        //estos son campos de auditoria, se crean dos columnas createdAt, updatedAt, el createdAt => se va a registra la hora actual en la cual se creó este registro.       //updatedAt: va a guardar la hroa acutal cuadno cualquier campo de este registro se modifique.
        createdAt: "fecha_creacion",
        updatedAt: "ultima_modificacion",
    }                         
);

