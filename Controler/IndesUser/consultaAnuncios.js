    var datosAnunciosID = [];
    var datosAnunciosPSEUDONIMO = [];
    var datosAnunciosPRECIO = [];
    var datosAnunciosPRECIOMINMAX = [];
    var datosAnunciosMONEDAVENTA = [];
    var datosAnunciosMETODOPAGO = [];

function listarAnuncios(condicional){
    var query = connection2.query(
        "SELECT anun.id as id_anuncio, "+
        "usu.pseudonimo, "+
        "anun.precio, "+
        "concat(anun.precio_minimo,'-',anun.precio_maximo) as precio_min_max, "+
        "mon.nombre as moneda_venta "+
        "FROM anuncios anun "+
        "JOIN usuarios usu "+
        "JOIN monedas mon "+
        "ON anun.usuarios_id_vendedor = usu.id "+
        "AND mon.id = anun.monedas_id_venta "+condicional, function (error, result1) {

            if (error) {
                alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ");
            } else {
                if (result1[0].id_anuncio != null && result1[0].id_anuncio != "") {                                                    
         
                    for(i = 0; i < result1.length; i++){
                        try {
                            datosAnunciosID[i] = result1[i].id_anuncio;
                            datosAnunciosPSEUDONIMO[i] = result1[i].pseudonimo;
                            datosAnunciosPRECIO[i] = result1[i].precio;
                            datosAnunciosPRECIOMINMAX[i] = result1[i].precio_min_max;
                            datosAnunciosMONEDAVENTA = result1[i].moneda_venta;
                            alert("---: "+i);
                            listarMetodosPagoMonedas(i, result1[i].id_anuncio);
                        } catch (error) {
                            alert("Error Desconocido line 62 consultaAnuncios.js \n" + error + "\nPor favor comuníquese con el área de programación ")
                        }
                    }                                              
                    
                }
            }
        }
    );
    
}
function listarMetodosPagoMonedas(i, id_anun){
    
    /* datos metodos pago */
    alert(":::::::::::::::::::::::::::::::: "+datosAnunciosPSEUDONIMO.length);
        alert("---"+id_anun);
        var query = connection2.query(
            "select group_concat(' ',for_pag.nombre) as forma_pago_nombre "+
            "FROM formas_pago for_pag "+
            "JOIN formas_pago_aceptadas for_pag_acep "+
            "ON for_pag.id = for_pag_acep.formas_pago_id "+
            " WHERE for_pag_acep.anuncios_id = ? "+
            "GROUP BY for_pag_acep.anuncios_id ", 
        [id_anun], function(error,result2){
            if(error){
                alert("Error Desconocido\n" + error + "\nPor favor comuníquese con el área de programación ");
            }else{
                try {
                    if(result2[0].forma_pago_nombre != null || result2[0].forma_pago_nombre != ""){    
                        datosAnunciosMETODOPAGO[i] = result2[i].forma_pago_nombre;
                        alert("________________________: "+result2[0].forma_pago_nombre);
                        /*console.log("- "+datosAnunciosID[i]+" - "+datosAnunciosPSEUDONIMO[i]+
                        " - "+datosAnunciosPRECIO[i]+" - "+datosAnunciosPRECIOMINMAX+" - "+datosAnunciosMONEDAVENTA+ 
                        " - "+datosAnunciosMETODOPAGO[i]);*/
                    }
                }catch(error){
                    alert("Error Desconocido\n" + error + "\nPor favor comuníquese con el área de programación ");
                }
            }
        });     
    
    return;
}