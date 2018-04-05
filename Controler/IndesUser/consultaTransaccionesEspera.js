function consulta_datos_en_espera() {
    var id_usuario_call = document.getElementById('idUsuario').value;
    var id_intercambio_result = "";
    var id_anuncio_result = "";
    var datosEspera = [];

    var query = connection.query("SELECT id_intercambio, fecha_hora_inicio_asignacion FROM asignaciones_llamadas where id_usuario = ? and estado_asignacion = 'Asignado' order by id_asignacion asc limit 1", [id_usuario_call], (errro, result){
        if (error) {
            alert("Error 1 pongase en contacto con el area de desarrollo");
        } else {
            try {
                if (result[0].id_intercambio != null || result[0].id_intercambio != "") {
                    id_intercambio_result = result[0].id_intercambio;
                    datosEspera[0] = id_anuncio_result;
                    var query = connection.query(
                        "SELECT CONCAT(usu.nombres,' ',usu.apellidos) As nombres_comprador, trans.anuncios_id As id_anuncio" +
                        "FROM celericoin.usuarios usu " +
                        "JOIN celericoin.transferencias trans " +
                        "JOIN celericoin.formas_pago forpago " +
                        "JOIN celericoin.monedas mon " +
                        "JOIN callcenter.contrasenas con " +
                        "ON usu.id = trans.usuarios_id_comprador " +
                        "AND usu.id = con.id_usuario_celeri " +
                        "AND trans.formas_pago_id = forpago.id " +
                        "AND trans.monedas_id_compra = mon.id " +
                        "WHERE trans.id = ? ", [id_intercambio_result], function (error, result) {

                            if (error) {
                                alert("Error 2 pongase en contacto con el area de desarrollo");
                            } else {
                                if (result[0].id_anuncio != null && result[0].id_anuncio != "") {
                                    datosEspera[1] = result[0].nombres_comprador;
                                    id_anuncio_result = result[0].id_anuncio;

                                    var query = connection.query(
                                        "SELECT CONCAT(usu.nombres,' ',usu.apellidos) as nombres_vendedor " +
                                        "FROM celericoin.usuarios usu " +
                                        "JOIN callcenter.contrasenas con " +
                                        "JOIN celericoin.anuncios anun " +
                                        "ON usu.id = con.id_usuario_celeri " +
                                        "AND anun.usuarios_id_vendedor = usu.id " +
                                        "WHERE anun.id = ?", [id_anuncio_result], function (error, result) {

                                            if (error) {
                                                alert("Error 3 consulte el area de desarrollo");
                                            } else {
                                                if (result[0].cedula_vendedor != null && result[0].cedula_vendedor != "") {                                                    
                                                    datosFormulario[2] = result[0].nombres_vendedor;                                                 

                                                    $("#cedula_comprador").val(datosFormulario[1]);
                                                    $("#nombre_comprador").val(datosFormulario[2]);
                                                    $("#telefono_comprador").val(datosFormulario[3]);
                                                    $("#contrasena1_comprador").val(datosFormulario[4]);
                                                    $("#contrasena2_comprador").val(datosFormulario[5]);
                                                    $("#monto").val(datosFormulario[7]);
                                                    $("#nombre_vendedor").val(datosFormulario[10]);
                                                    $("#cedula_vendedor").val(datosFormulario[9]);
                                                    $("#telefono_vendedor").val(datosFormulario[11]);
                                                    $("#contrasena1_vendedor").val(datosFormulario[12]);
                                                    $("#contrasena2_vendedor").val(datosFormulario[13]);
                                                    $("#forma_pago").val(datosFormulario[6]);
                                                    return true;
                                                }
                                            }
                                        }
                                    );
                                }
                            }
                        }
                    );
                }
            } catch (error) {

            }
        }
    });

}