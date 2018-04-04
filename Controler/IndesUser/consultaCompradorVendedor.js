function consulta_datos_transacciones(){
    var query = connection.query("call procedure_consulta_id_intercambio(?)", [var_nombre_usuario, var_contrasena_usuario], function (error, result) {
        if (error) {
            console.log(error);
            alert("error: " + error);
        } else {
            try {
                
            }catch(error){
                alert(error);
            }
        }
    });
}