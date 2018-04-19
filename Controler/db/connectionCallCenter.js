//Llamada a la dependencia MySQL 
var mysql = require('mysql');

//Configuración necesaria para conectar a la base de datos
var connection = mysql.createConnection({
   
    host: '192.168.1.23',
    user: 'usuario1',
    password: '1qaz18++',
    database : 'callcenter',
    port: 3306
    /*
    host: 'localhost',
    user: 'root',
    password: '',
    database : 'callcenter',
    port: 3306
    */
});