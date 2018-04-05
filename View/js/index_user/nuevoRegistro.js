var id_usuario_celeri = "";

function verifyCamposEspera() {
    if ($('#nombre_comprador').val() == null || $('#nombre_comprador').val() == "") {
        var query = connection.query("select * from contrasenas where estado_confirmacion = 'POR CONFIRMAR' AND estado_vista = 'FALSE'", function (error, result) {

            if (error) {
                console.log(error);
                alert("error: " + error);
            } else {
                try {
                    id_usuario_celeri = result[0].id_usuario_celeri;
                    if (result[0].estado_confirmacion === "POR CONFIRMAR") {
                        var query = connection.query("UPDATE contrasenas set estado_vista = 'TRUE' WHERE id_usuario_celeri = ?", [id_usuario_celeri], function (error, result) {
                            if (error) {
                                alert("Error 2:" + error);
                            } else {
                                var query = connection.query("select * from celericoin.usuarios where id = ?", [id_usuario_celeri], function (error, result) {
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

                                $('#modalRegistro').modal({ backdrop: 'static', keyboard: false });
                                clearInterval(internalProccessVerify);
                                //$('#modalRegistro').addClass("nuevo-registro");
                            }
                        });                        
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

function asignarClaves(estado_confirmacion) {

    var clave_usuario = document.getElementById('clave_usuario').value;
    var clave_celeri = document.getElementById('clave_celericoin').value;

    if (estado_confirmacion === "CONFIRMADO") {
        var query = connection.query("update contrasenas set contrasena_1 = AES_ENCRYPT( ? , UNHEX(SHA2('bc12jD=U\d7MrPr',512))), contrasena_2 = AES_ENCRYPT( ? , UNHEX(SHA2('bc12jD=U\d7MrPr',512))) where id_usuario_celeri = ?", [clave_usuario, clave_celeri, id_usuario_celeri], function (error, result) {
            if (error) {
                alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ")
            } else {
                try {
                    var query = connection.query("update contrasenas set estado_confirmacion = ? where id_usuario_celeri = ?", [estado_confirmacion, id_usuario_celeri], function (error, result) {
                        if (error) {
                            alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ")
                        } else {
                            alert("Se ha realizado el registro correctamente");
                            limpiar_campos_contrasenas();
                        }
                    });
                } catch (error) {
                    alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ")
                }
            }
        });
    } else if (estado_confirmacion === "POSPUESTO") {
        var query = connection.query("update contrasenas set estado_confirmacion = ? where id_usuario_celeri = ?", [estado_confirmacion, id_usuario_celeri], function (error, result) {
            if (error) {
                alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ")
            } else {
                alert("Se ha pospuesto el registro correctamente");
                limpiar_campos_contrasenas();
            }
        });
    }
    internalProccessVerify = setInterval(verifyCampos, 3000);
}

function limpiar_campos_contrasenas() {
    document.getElementById('clave_usuario').value = "";
    document.getElementById('clave_celericoin').value = "";
}

function finalizarTransaccion(){
    var id_usuario_callcenter = document.getElementById('idUsuario').value;

    var query = connection.query("UPDATE asignaciones_llamadas set estado_asignacion = 'FINALIZADO' WHERE id_usuario = ?", [id_usuario_callcenter], function(error,result){
        if(error){
            alert("Error 1 consulte al area de desarrollo: "+ error);
        }else{
            try {
                alert("Transaccion Finalizado");

                /* Datos Comprador */
                document.getElementById('nombre_comprador').value = "";
                document.getElementById('cedula_comprador').value = "";
                document.getElementById('telefono_comprador').value = "";
                document.getElementById('contrasena1_comprador').value = "";
                document.getElementById('contrasena2_comprador').value = "";
                document.getElementById('monto').value;

                /* Datos Vendedor */
                document.getElementById('nombre_vendedor').value = "";
                document.getElementById('cedula_vendedor').value = "";
                document.getElementById('telefono_vendedor').value = "";
                document.getElementById('contrasena1_vendedor').value = "";
                document.getElementById('contrasena2_vendedor').value = "";
                document.getElementById('forma_pago').value = "";
            } catch (error) {
                alert("Error")
            }
        }
    });
}