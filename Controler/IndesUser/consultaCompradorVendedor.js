function consulta_datos_transacciones(){
    var var_id_usuario = $("#idUsuario").val();
    var id_intercambio_result = "";
    var id_anuncio_result = "";
    var datosFormulario = [];
    try{
        var query = connection.query("SELECT id_intercambio FROM asignaciones_llamadas where id_usuario = ? and estado_asignacion = 'Asignado' order by id_asignacion asc limit 1", [var_id_usuario], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                try{
                    if(result[0].id_intercambio != null && result[0].id_intercambio != ""){
                        id_intercambio_result = result[0].id_intercambio;
                        datosFormulario[0] = id_intercambio_result;
                        var query = connection.query(
                            "SELECT usu.dni as cedula_comprador, CONCAT(usu.nombres,' ',usu.apellidos) as nombres_comprador, "+
                            "usu.telefono as telefono_comprador, "+
                            "CONVERT(AES_DECRYPT(con.contrasena_1, UNHEX(SHA2('bc12jD=U\d7MrPr',512))), char(100)) as contrasena_1_comprador, "+
                            "CONVERT(AES_DECRYPT(con.contrasena_2, UNHEX(SHA2('bc12jD=U\d7MrPr',512))), char(100)) as contrasena_2_comprador, "+
                            "CONCAT(forpago.nombre,' - ',mon.nombre) as forma_pago_moneda, trans.monto as monto,trans.anuncios_id as id_anuncio "+
                            "FROM celericoin.usuarios usu "+
                            "JOIN celericoin.transferencias trans "+
                            "JOIN celericoin.formas_pago forpago "+
                            "JOIN celericoin.monedas mon "+
                            "JOIN callcenter.contrasenas con "+
                            "ON usu.id = trans.usuarios_id_comprador "+
                            "AND usu.id = con.id_usuario_celeri "+
                            "AND trans.formas_pago_id = forpago.id "+
                            "AND trans.monedas_id_compra = mon.id "+
                            "WHERE trans.id = ? ", [id_intercambio_result], function (err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                    if(result[0].id_anuncio != null && result[0].id_anuncio != ""){
                                        datosFormulario[1] = result[0].cedula_comprador;
                                        datosFormulario[2] = result[0].nombres_comprador;
                                        datosFormulario[3] = result[0].telefono_comprador;
                                        datosFormulario[4] = result[0].contrasena_1_comprador;
                                        datosFormulario[5] = result[0].contrasena_2_comprador;
                                        datosFormulario[6] = result[0].forma_pago_moneda;
                                        datosFormulario[7] = result[0].monto;
                                        datosFormulario[8] = result[0].id_anuncio;
                                        id_anuncio_result = result[0].id_anuncio;
                                        var query = connection.query(
                                            "SELECT usu.dni as cedula_vendedor, CONCAT(usu.nombres,' ',usu.apellidos) as nombres_vendedor, "+
                                            "usu.telefono as telefono_vendedor,"+
                                            "CONVERT(AES_DECRYPT(con.contrasena_1, UNHEX(SHA2('bc12jD=U\d7MrPr',512))), char(100)) as contrasena_1_vendedor, "+
                                            "CONVERT(AES_DECRYPT(con.contrasena_2, UNHEX(SHA2('bc12jD=U\d7MrPr',512))), char(100)) as contrasena_2_vendedor "+
                                            "FROM celericoin.usuarios usu "+
                                            "JOIN callcenter.contrasenas con "+
                                            "JOIN celericoin.anuncios anun "+
                                            "ON usu.id = con.id_usuario_celeri "+
                                            "AND anun.usuarios_id_vendedor = usu.id "+
                                            "WHERE anun.id = ?", [id_anuncio_result], function (err, result) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                    if(result[0].cedula_vendedor != null && result[0].cedula_vendedor != ""){
                                                        datosFormulario[9] = result[0].cedula_vendedor;
                                                        datosFormulario[10] = result[0].nombres_vendedor;
                                                        datosFormulario[11] = result[0].telefono_vendedor;
                                                        datosFormulario[12] = result[0].contrasena_1_vendedor;
                                                        datosFormulario[13] = result[0].contrasena_2_vendedor;
                                                        
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
                                        });
                                    }
                            }
                        });
                    }
                }catch(error){
                    return false;
                }
            }
        });
    }catch(error){
        return false;
    }
    return false;
}