function consulta_datos_transacciones(){
    var var_id_usuario = $("#idUsuario").val();
    var query = connection.query("call procedure_consulta_id_intercambio(?)", [var_id_usuario], function (error, result) {
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