import categoria_model from "../models/categoria";
import estante_model from "../models/estante";
import producto_model from "../models/producto";
import producto_estante_model from "../models/productoEstante";
import rol_model from "../models/rol";
import usuario_model from "../models/usuario";

//creamos las variables con referencia a sus modelos correspondientes.
//al momento de llamarlas lo que va a suceder es que se va a crear la tabla en la BD, adicionalmente a ello almacenamos su resultado para poder crear posteriormente.
export const Categoria = categoria_model();
export const Estante = estante_model();
export const Producto = producto_model();
export const ProductoEstante = producto_estante_model();
export const Rol = rol_model();
export const Usuario = usuario_model();

//https://sequelize.org/master/manual/assocs.html
//una vez definida todos los modelos ahora pasamos a crear sus relaciones:
//una categoria tienen muchos estantes.
//si no queremos perder toda la informacion de la base de datos por solamnete resetear una tabla o varias tablas.
//tambien podemos SOLAMNETE eliminar y volver a crear una tabla en las 
//Usuario.sync({ force:true});
Categoria.hasMany(Estante,   //categoria tiene muchos estantes.
    { 
    foreigney: {
        name: "categorias_id", 
        allowNull: false,
    },
}
);
Estante.belongsTo(Categoria, { // estante tiene una categoria
    foreignKey: "categorias_id",
}
    );
Estante.hasMany(ProductoEstante, {
    foreignKey: {
        name: "estantes_id",
        allowNull: false,
    },
});
ProductoEstante.belongsTo(Estante,{
    foreignKey: "estantes_id",
});
Producto.hasMany(ProductoEstante, {
    foreignKey: {
        name: "productos_id",
        allowNull: false,
    },
});
ProductoEstante.belongsTo(Producto,{
    foreignKey: "productos_id",
});

Rol.hasMany(Usuario, {
    foreignKey: {
        name: "roles_id",
        allowNull: false,
    },    
});
Usuario.belongsTo(Rol, {
    foreignKey: "roles_id",
});

//Usuario.sync({force: true}); asi se borra las tablas.
//Como hacer copias de seguridad: (es mejor hacerlas cuando el sistema no tenga mucho consumo.)




