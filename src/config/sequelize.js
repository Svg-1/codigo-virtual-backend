import {Sequelize} from "sequelize";

export const conexion = new Sequelize (
"almacen", //database name
"root",    //username
"svgpass0123",    //mi password
{
    dialect: "mysql", // también podemos usar dialectos para pgadmin, sqlserver, sqlite, mariadb, mysql,.
    // one of 'mysql'|'mariadb'| 'postgres' |'mssql'| para sqlite se usa concection URI
    host: "127.0.0.1",
    port: "3306",
    timezone: "-05:00", //no funciona en SQLITE
    dialectOptions: {    // sirve para que al momento de mostrar las fechas, automaticamnete las convierta en string y no tener que hacer unna conversión manual. 
        dateStrings: true,

    },
    logging: false,
}
);
    