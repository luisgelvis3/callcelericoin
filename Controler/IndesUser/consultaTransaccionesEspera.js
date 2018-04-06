function consulta_datos_en_espera() {
    var id_usuario_call = document.getElementById('idUsuario').value;
    var id_intercambio_result = "";
    var id_anuncio_result = "";
    var datosEsperaIdIntercambio = [];
    var datosEsperaIdAnuncio = [];
    var datosEsperaNombresCompradores = [];
    var datosEsperaNombresVendedores = [];
    var datosEsperaFechasAsignaciones = [];
    var datosEsperaEstadoBaucher = [];
    var datosEsperaIdAsignacionLlamada = [];

    var id_asignacion_llamadas_consulta = "";
    var ids_intercambios_where = "";

    var query = connection.query("SELECT id_asignacion, id_intercambio,  DATE_FORMAT(fecha_hora_inicio_asignacion, '%d/%l/%Y %H:%i:%s') as fecha_asignacion FROM asignaciones_llamadas WHERE id_usuario = ? and estado_asignacion = 'EN ESPERA' order by id_asignacion asc", [id_usuario_call], function (error, result){
        if (error) {
            alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ")
        } else {
            try {
                if (result[0].id_intercambio != null || result[0].id_intercambio != "") {
                    ids_intercambios_where = " WHERE trans.id = "+result[0].id_intercambio;
                    datosEsperaIdIntercambio[0] = result[0].id_intercambio;
                    datosEsperaFechasAsignaciones[0] = result[0].fecha_asignacion;
                    datosEsperaIdAsignacionLlamada[0] = result[0].id_asignacion;

                    for(i = 1; i < result.length; i++){
                        ids_intercambios_where += " XOR trans.id = "+result[i].id_intercambio;
                        datosEsperaIdIntercambio[i] = result[i].id_intercambio;
                        datosEsperaFechasAsignaciones[i] = result[i].fecha_asignacion;
                        datosEsperaIdAsignacionLlamada[i] = result[i].id_asignacion;
                    }

                    var query = connection.query(
                        "SELECT CONCAT(usu.nombres,' ',usu.apellidos) As nombres_comprador, trans.anuncios_id As id_anuncio " +
                        "FROM celericoin.usuarios usu " +
                        "JOIN celericoin.transferencias trans " +
                        "JOIN celericoin.formas_pago forpago " +
                        "JOIN celericoin.monedas mon " +
                        "JOIN callcenter.contrasenas con " +
                        "ON usu.id = trans.usuarios_id_comprador " +
                        "AND usu.id = con.id_usuario_celeri " +
                        "AND trans.formas_pago_id = forpago.id " +
                        "AND trans.monedas_id_compra = mon.id " +
                        ids_intercambios_where, function (error, result) {

                            if (error) {
                                alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ");
                            } else {
                                if (result[0].id_anuncio != null && result[0].id_anuncio != "") {

                                    ids_anuncios_where = " WHERE asigllama.estado_asignacion = 'EN ESPERA' AND callusu.id_usuario = "+id_usuario_call+" AND  anun.id = "+result[0].id_anuncio;
                                    datosEsperaIdAnuncio[0] = result[0].id_anuncio;
                                    datosEsperaNombresCompradores[0] = result[0].nombres_comprador;

                                    for(i = 1; i < result.length; i++){
                                        ids_anuncios_where += " OR anun.id = "+result[i].id_anuncio;
                                        datosEsperaIdAnuncio[i] = result[i].id_anuncio;
                                        datosEsperaNombresCompradores[i] = result[i].nombres_comprador;
                                    }

                                    var query = connection.query(
                                        "SELECT CONCAT(celeriusu.nombres,' ',celeriusu.apellidos) as nombres_vendedor "+
                                        "FROM celericoin.usuarios celeriusu "+
                                        "JOIN celericoin.transferencias trans "+
                                        "JOIN celericoin.anuncios anun "+
                                        "JOIN callcenter.asignaciones_llamadas asigllama "+
                                        "JOIN callcenter.usuarios callusu "+
                                        "ON anun.usuarios_id_vendedor = celeriusu.id "+
                                        "AND anun.id = trans.anuncios_id "+
                                        "AND asigllama.id_intercambio = trans.id "+
                                        "AND asigllama.id_usuario = callusu.id_usuario "+
                                        ids_anuncios_where, function (error, result) {

                                            if (error) {
                                                alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ");
                                            } else {
                                                if (result[0].nombres_vendedor != null && result[0].nombres_vendedor != "") {                                                    
                                                    
                                                    datosEsperaNombresVendedores[0] = result[0].nombres_vendedor;
                                  
                                                    for(i = 1; i < result.length; i++){
                                                        datosEsperaNombresVendedores[i] = result[i].nombres_vendedor;
                                                    }                                              
                                                    var contenido_tabla = 
                                                    "<table class='table table-hover'>"+
                                                        "<thead>"+
                                                            "<tr>"+
                                                                "<th></th>"+
                                                                "<th>Vendedor</th>"+
                                                                "<th>Comprador</th>"+
                                                                "<th>Fecha y Hora</th>"+
                                                                "<th></th>"+
                                                            "</tr>"+
                                                        "</thead>"+
                                                        "<tbody id = 'tbody_transacciones_espera'>";
                                                        
                                                    for(i = 0; i < datosEsperaIdIntercambio.length; i++){
                                                        
                                                        contenido_tabla += "<tr>"+
                                                            "<th>"+
                                                                "<div class='cirle-estado'></div>"+
                                                            "</th>"+
                                                            "<th>"+datosEsperaNombresCompradores[i]+"</th>"+
                                                            "<th>"+datosEsperaNombresVendedores[i]+"</th>"+
                                                            "<th>"+datosEsperaFechasAsignaciones[i]+"</th>"+
                                                            "<th>"+
                                                            "<button class='btn btn-primary btn-reanudar' onclick='asignadoEstadoTransaccion("+datosEsperaIdAsignacionLlamada[i]+");'>Reanudar</button>"+
                                                            "</th>"+
                                                            "</tr>";
                                                    }
                                                    contenido_tabla += "</tbody></table>";
                                                    document.getElementById("outputDivTransacciones").innerHTML = contenido_tabla;
                                                    //document.getElementById("outputDiv").innerHTML = newTable;
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
                document.getElementById("outputDivTransacciones").innerHTML = "";
                console.log(error);
            }
        }
    
    });

}