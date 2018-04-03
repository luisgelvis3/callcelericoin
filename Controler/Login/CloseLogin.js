function cerrarSession() {

    var var_id_usuario = document.getElementById('idUsuario').value;

    var query = connection.query("select * from usuarios where id_usuario = ?", [var_id_usuario], function (error, result){
        if (error) {
            console.log(error);
            alert("error: " + error)
        }else {
        var id = result[0].id_usuario;
        var query = connection.query("UPDATE usuarios SET estado_usuario = 'Ausente' WHERE id_usuario = ? ", [id], function (error, result) {
            if (error) {
                throw error;
                alert(error);
                return false;
            } else {
                return true;
            }
        });
        location.href = "login.html";
    }
    });
}
    
