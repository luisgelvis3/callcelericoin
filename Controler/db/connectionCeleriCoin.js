var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '192.168.1.23',
    user: 'root',
    password: '',
    database : 'celericoin',
    port: 3306
});

connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conexión correcta.')
    }
});

connection.end();