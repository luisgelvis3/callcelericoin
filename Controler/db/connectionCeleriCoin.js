//Llamada a la dependencia MySQL 
var mysql = require('mysql');
var connection2 = mysql.createConnection({
    
    /*host: 'localhost',
    user: 'root',
    password: '',
    database : 'celericoin',
    port: 3306*/
    host: '192.168.1.23',
    user: 'usuario1',
    password: '1qaz18++',
    database : 'celericoin',
    port: 3306
});
