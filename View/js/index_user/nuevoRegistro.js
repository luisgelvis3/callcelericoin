var id_usuario_celeri = "";

function verifyCamposEspera() {
    if ($('#nombre_comprador').val() == null || $('#nombre_comprador').val() == "" && $('#nombre').val() == null || $('#nombre').val() == "") {
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
                                var query = connection.query("SELECT usuarios.dni, CONCAT( usuarios.nombres, ' ', usuarios.apellidos) As nombre, "+
                                "usuarios.direccion, paises.cod_tel,concat( MID(usuarios.telefono,1,3), '-', MID(usuarios.telefono,4,3), '-', MID(usuarios.telefono,7,4) ) as telefono, "+
                                "usuarios.correo "+
                                "FROM celericoin.usuarios "+
                                "INNER JOIN celericoin.paises ON usuarios.paises_id = paises.id "+
                                "WHERE usuarios.id = ? AND usuarios.paises_id IN ( "+
                                "SELECT paises.id FROM celericoin.paises "+
                                "INNER JOIN celericoin.usuarios ON usuarios.paises_id = paises.id "+
                                "WHERE usuarios.id = ?)", [id_usuario_celeri, id_usuario_celeri] , function (error, result) {
                                    if (error) {
                                        alert("error en la consulta" + error);
                                    } else {
                                        try {
                                            var query
                                            document.getElementById('nombre').value = result[0].nombre;
                                            document.getElementById('cedula').value = result[0].dni;
                                            document.getElementById('direccion').value = result[0].direccion;
                                            document.getElementById('indicativo').value = result[0].cod_tel;
                                            document.getElementById('telefono').value = result[0].telefono;
                                            document.getElementById('correo').value = result[0].correo;
                                        } catch (error) {
                                            alert("No hay nuevos registro")
                                        }
                                    }
                                });

                                $('#modalRegistro').modal({ backdrop: 'static', keyboard: false });
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
    document.getElementById('nombre').value = "";
    document.getElementById('cedula').value = "";
    document.getElementById('telefono').value = "";
    document.getElementById('correo').value = "";
    document.getElementById('direccion').value = "";
}

function limpiar_campos_transaccion(){
    /* Datos Comprador */
    document.getElementById('nombre_comprador').value = "";
    document.getElementById('cedula_comprador').value = "";
    document.getElementById('telefono_comprador').value = "";
    document.getElementById('contrasena1_comprador').value = "";
    document.getElementById('contrasena2_comprador').value = "";
    document.getElementById('monto').value = "";

    /* Datos Vendedor */
    document.getElementById('nombre_vendedor').value = "";
    document.getElementById('cedula_vendedor').value = "";
    document.getElementById('telefono_vendedor').value = "";
    document.getElementById('contrasena1_vendedor').value = "";
    document.getElementById('contrasena2_vendedor').value = "";
    document.getElementById('forma_pago').value = "";
    document.getElementById('id_asignacion_transaccion').value = "";
    document.getElementById('cantBitcoin').value = "";
    
}

function openModal(){
    $('#modalComentarios').modal('show');
}

function finalizarTransaccion(){
    var id_asignacion_llamadas_consulta = document.getElementById('id_asignacion_transaccion').value;
    if (id_asignacion_llamadas_consulta == ""){
        alert("No se ha encontrado ninguna transacción");
        return;
    }
    if(confirm('¿Realmente deseas finalizar la transacción?'))
    if(confirm('Si lo haces no podrás volver a retomarla\n¿Estás seguro?')){
        
        var query = connection.query("UPDATE asignaciones_llamadas set estado_asignacion = 'FINALIZADO', fecha_hora_fin_asignacion = Now() WHERE id_asignacion = ?", [id_asignacion_llamadas_consulta], function(error,result){
            if(error){
                alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ")
            }else{
                try {
                    alert("Transacción Finalizada");
                    limpiar_campos_transaccion();
                    consulta_datos_transacciones();
                    consulta_datos_en_espera();
                    
                } catch (error) {
                    alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ")
                }
            }
        });
    }
}

function enEsperaTransaccion(){
    var id_asignacion_llamadas_consulta = document.getElementById('id_asignacion_transaccion').value;

    if (id_asignacion_llamadas_consulta == ""){
        alert("No se ha encontrado ninguna transacción");
        return;
    }

        var query = connection.query("UPDATE asignaciones_llamadas set estado_asignacion = 'EN ESPERA' WHERE id_asignacion = ?", [id_asignacion_llamadas_consulta], function(error,result){
            if(error){
                alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ")
            }else{
                try {
                    limpiar_campos_transaccion();
                    consulta_datos_transacciones();
                    consulta_datos_en_espera();
                } catch (error) {
                    alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ")
                }
            }
        });
}


function cancelarTransaccion(){
    var id_asignacion_llamadas_consulta = document.getElementById('id_asignacion_transaccion').value;
    if (id_asignacion_llamadas_consulta == ""){
        alert("No se ha encontrado ninguna transacción");
        return;
    }

    if(confirm('¿Realmente deseas cancelar la transacción?'))
    if(confirm('Si lo haces no podrás volver a retomarla\n¿Estás seguro?')){
        
        var query = connection.query("UPDATE asignaciones_llamadas set estado_asignacion = 'CANCELADO' WHERE id_asignacion = ?", [id_asignacion_llamadas_consulta], function(error,result){
            if(error){
                alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ")
            }else{
                try {
                    alert("Transacción Cancelada");

                    limpiar_campos_transaccion();
                    consulta_datos_transacciones();
                    consulta_datos_en_espera();
                } catch (error) {
                    alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ")
                }
            }
        });
    }
}

function asignadoEstadoTransaccion(id_tran_espera){

    if (id_tran_espera == ""){
        alert("No se ha encontrado ninguna transacción");
        return;
    }

    var id_asignacion_llamadas_consulta = document.getElementById('id_asignacion_transaccion').value;
    if (id_asignacion_llamadas_consulta != "" && id_asignacion_llamadas_consulta != null){
        enEsperaTransaccion();
    }
        
        var query = connection.query("UPDATE asignaciones_llamadas set estado_asignacion = 'Asignado' WHERE id_asignacion = ?", [id_tran_espera], function(error,result){
            if(error){
                alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ")
            }else{
                limpiar_campos_transaccion();
                consulta_datos_transacciones();
                consulta_datos_en_espera();
            }
        });
    
}

function btnAusente(){
    var id_asesor = document.getElementById('idUsuario').value;

    var query = connection.query("UPDATE callcenter.usuarios SET estado_usuario = 'Ausente' WHERE id_usuario = ? ", [id_asesor], function(error,result){
        if(error){
            alert("Error "+ error + "Por favor pongase en contacto con el area de desarrollo");
        }else{
            $('.estado-circle').removeClass("color-estado-disponible");
            $('.estado-circle').addClass("color-estado-ausente");
            $('.btn-ausente').attr('disabled', 'disabled');
            $('.btn-disponible').removeAttr('disabled');
        }
    });
}

function btnDisponible(){
    var id_asesor = document.getElementById('idUsuario').value;

    var query = connection.query("UPDATE callcenter.usuarios SET estado_usuario = 'Disponible' WHERE id_usuario = ? ", [id_asesor], function(error, result){
        if(error){
            alert("Error "+ error + "Pongase en contacto con el area de desarrollo");
        }else{
            $('.estado-circle').removeClass("color-estado-ausente");
            $('.estado-circle').addClass("color-estado-disponible");
            $('.btn-disponible').attr('disabled', 'disabled');
            $('.btn-ausente').removeAttr('disabled');            
        }
    });
}
