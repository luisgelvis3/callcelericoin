var id_usuario_celeri = "";

    function verifyCamposEspera() {
        if($('#nombre_comprador').val() == null || $('#nombre_comprador').val() == ""){
            var query = connection.query("select * from contrasenas where estado_confirmacion = 'POR CONFIRMAR'", function (error, result) {
                
                if (error) {
                    console.log(error);
                    alert("error: " + error);
                } else {
                    try {
                        id_usuario_celeri = result[0].id_usuario_celeri;
                        if (result[0].estado_confirmacion === "POR CONFIRMAR") {
                            nuevoRegistro(id_usuario_celeri);
                            $('#modalRegistro').modal({backdrop: 'static', keyboard: false});
                            //$('#modalRegistro').addClass("nuevo-registro");
                        } /*else {
                            $('#modalRegistro').removeClass("nuevo-registro");
                        }*/
                    } catch (error) {
                        $('#modalRegistro').removeClass("nuevo-registro");
                    }
                }
            });
        }
        
    }

    function nuevoRegistro(id_usuario_celeri_var) {
        var query = connection.query("select * from celericoin.usuarios where id = ?", [id_usuario_celeri_var], function (error, result) {
            if (error) {
                alert("error en la consulta" + error);
            } else {
                try {
                    var query
                    document.getElementById('nombre').value = result[0].nombres;
                    document.getElementById('cedula').value = result[0].dni;
                    document.getElementById('direccion').value = result[0].direccion;
                    document.getElementById('telefono').value = result[0].telefono;
                    document.getElementById('correo').value = result[0].correo;
                } catch (error) {
                    alert("No hay nuevos registro")
                }
            }
        });

    }

    function asignarClaves(estado_confirmacion){

        var clave_usuario = document.getElementById('clave_usuario').value;
        var clave_celeri = document.getElementById('clave_celericoin').value;

        if(estado_confirmacion === "CONFIRMADO"){
        var query = connection.query("update contrasenas set contrasena_1 = AES_ENCRYPT( ? , UNHEX(SHA2('bc12jD=U\d7MrPr',512))), contrasena_2 = AES_ENCRYPT( ? , UNHEX(SHA2('bc12jD=U\d7MrPr',512))) where id_usuario_celeri = ?", [clave_usuario, clave_celeri, id_usuario_celeri], function(error, result){
            if(error){
                alert("Error Desconocido\n"+error+"\nPor favor comuniquese con el área de programación ")
            }else{
                try {
                    var query = connection.query("update contrasenas set estado_confirmacion = ? where id_usuario_celeri = ?", [estado_confirmacion, id_usuario_celeri], function(error, result){
                        if(error){
                            alert("Error Desconocido\n"+error+"\nPor favor comuniquese con el área de programación ")
                        }else{
                            alert("Se ha realizado el registro correctamente");
                            limpiar_campos_contrasenas();
                        }
                    });
                } catch (error) {
                    alert("Error Desconocido\n"+error+"\nPor favor comuniquese con el área de programación ")
                }
            }
        });        
        }else if(estado_confirmacion === "POSPUESTO"){
            var query = connection.query("update contrasenas set estado_confirmacion = ? where id_usuario_celeri = ?", [estado_confirmacion, id_usuario_celeri], function(error, result){
                if(error){
                    alert("Error Desconocido\n"+error+"\nPor favor comuniquese con el área de programación ")
                }else{
                    alert("Se ha pospuesto el registro correctamente");
                    limpiar_campos_contrasenas();
                }
            });
        }
    }

    function limpiar_campos_contrasenas(){
        document.getElementById('clave_usuario').value = "";
        document.getElementById('clave_celericoin').value = "";
    }