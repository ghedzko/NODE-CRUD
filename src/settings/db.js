const mysql = require("mysql");
const{database}= require("./keys.js");
const pool = mysql.createPool(database);
const {promisify}= require("util") ;
const { query } = require("express");
pool.getConnection((err,conn)=> {
    if (err) {
        if (err.code == "PROTOCOL_CONNECTION_LOST") {
            console.error("la conecxión  a la base de datos fué cerrada")
        }
        if (err.code == "ECONNREFUSED") {
            console.error("la conexión  a la base de datos fué rechazada")
        }
    }
    if (conn) conn.release();
    console.log("Conectado a la DB");
    return;
});
pool.query= promisify(pool.query);
module.exports=pool;

