    var datosAnunciosID = [];
    var datosAnunciosPSEUDONIMO = [];
    var datosAnunciosPRECIO = [];
    var datosAnunciosPRECIOMINMAX = [];
    var datosAnunciosMONEDAVENTA = [];
    var datosAnunciosMETODOPAGO = [];
    var acumuladorCicloAnuncios = 0;
    
$(document).ready(function(){
    $("select[name=moneda]").change(function(){
        listarAnuncios();
    });
    $("#pais").change(function(){
        listarAnuncios();
    });
    $("#criptomoneda").change(function(){
        listarAnuncios();
    });
    $("#monto_anuncio").on('change', function(){
        listarAnuncios();
    }).keyup();
});

function listarAnuncios(){
    var whereSQL = filtroBusqueda();
    document.getElementById("cont_anuncios_celeri").innerHTML = "";
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
        "AND mon.id = anun.monedas_id_venta "+whereSQL,function (error, result1) {

            if (error) {
                alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ");
            } else {
                try{
                    if (result1[0].id_anuncio != null && result1[0].id_anuncio != "") {                                                    
                        acumuladorCicloAnuncios = 0;
                        for(i = 0; i < result1.length; i++){
                            try {
                                datosAnunciosID[i] = result1[i].id_anuncio;
                                datosAnunciosPSEUDONIMO[i] = result1[i].pseudonimo;
                                datosAnunciosPRECIO[i] = result1[i].precio;
                                datosAnunciosPRECIOMINMAX[i] = result1[i].precio_min_max;
                                datosAnunciosMONEDAVENTA[i] = result1[i].moneda_venta;
                                listarMetodosPagoMonedas(i, result1[i].id_anuncio);
                            } catch (error) {
                                alert("Error Desconocido line 35 consultaAnuncios.js \n" + error + "\nPor favor comuníquese con el área de programación ")
                            }
                        }                                              
                    }
                }catch(error){
                    console.log(error);
                }
            }
        }
    );
    
}

function listarMetodosPagoMonedas(i, id_anun){
    /* datos metodos pago */
    var contenidoTablaAnuncios = "";
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
                        contenidoDefaultAnuncios = 
                        "<tr>"+
                            "<th>"+datosAnunciosPSEUDONIMO[i]+"</th>"+
                            "<th>"+datosAnunciosPRECIO[i]+"</th>"+
                            "<th>"+datosAnunciosPRECIOMINMAX[i]+"</th>"+
                            "<th>"+datosAnunciosMONEDAVENTA[i]+"</th>"+
                            "<th>"+datosAnunciosMETODOPAGO[i]+"</th>"+
                            "<th>"+
                                //"<button type='button' class='btn btn-detalle' data-toggle='modal' data-target='#modalDetalles'>Detalle</button>"+
                                "<button type='button' class='btn btn-detalle' onclick='asignarTransaccionAnuncio("+id_anun+");'>Asignar</button>"+
                            "</th>"+
                        "</tr>";

                        if(acumuladorCicloAnuncios == 0){
                            contenidoTablaAnuncios = 
                                "<div class='carousel-item active'>"+
                                    "<table class='table table-hover table-anuncios'>"+
                                        "<thead>"+
                                            "<tr>"+
                                                "<th>Proveedor</th>"+
                                                "<th>Precio</th>"+
                                                "<th>Min-Max</th>"+
                                                "<th>Moneda</th>"+
                                                "<th>Metodo de Pago</th>"+
                                            "</tr>"+
                                        "</thead>"+
                                        "<tbody>"+contenidoDefaultAnuncios;
                            acumuladorCicloAnuncios += 1;
                        }else if(acumuladorCicloAnuncios == 1 || acumuladorCicloAnuncios == 2 || acumuladorCicloAnuncios == 3){
                            contenidoTablaAnuncios = contenidoDefaultAnuncios;
                            acumuladorCicloAnuncios += 1;
                        }else if(acumuladorCicloAnuncios == 4){
                            contenidoTablaAnuncios = 
                                            contenidoDefaultAnuncios+
                                        "</tbody>"+
                                    "</table>"+
                                "</div>";
                                acumuladorCicloAnuncios = 0;
                        }
                        
                        document.getElementById("cont_anuncios_celeri").innerHTML += contenidoTablaAnuncios;
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

function consultaMonedasFiltro(){
    var contenidoSelectMonedas = "";
    document.getElementById("moneda").innerHTML = "";
    contenidoSelectMonedas = "<option value=''>Todas las monedas</option>";
    var query = connection2.query("select iso from monedas order by iso", function (error, result){
        if (error) {
            alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ");
        } else {
            try {
                if (result[0].iso != null || result[0].iso != "") {
                    for(i = 0; i < result.length; i++){
                        contenidoSelectMonedas += "<option value='"+result[i].iso+"'>"+result[i].iso+"</option>";
                    }
                }
                document.getElementById("moneda").innerHTML += contenidoSelectMonedas; 
            }catch(error){
                alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ");
            }
        }
    });
}

function consultaPaisesFiltro(){
    var contenidoSelectPaises = "";
    document.getElementById("pais").innerHTML = "";
    contenidoSelectPaises = "<option value=''>Todos los países</option>";
    var query = connection2.query("select nomb_esp from paises order by nomb_esp", function (error, result){
        if (error) {
            alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ");
        } else {
            try {
                if (result[0].nomb_esp != null || result[0].nomb_esp != "") {
                    for(i = 0; i < result.length; i++){
                        contenidoSelectPaises += "<option value='"+result[i].nomb_esp+"'>"+result[i].nomb_esp+"</option>";
                    }
                }
                document.getElementById("pais").innerHTML += contenidoSelectPaises; 
            }catch(error){
                alert("Error Desconocido en la línea 168 de consultaAnuncios.js\n" + error + "\nPor favor comuniquese con el área de programación ");
            }
        }
    });
}

function filtroBusqueda(){
    var whereSQL = "";
    var valorSelectMoneda = $('select[name=moneda]').val();
    var valorSelectPais = $('select[name=pais]').val();
    var valorSelectCriptomoneda = $('select[name=criptomoneda]').val();
    var valorPrecioText = $('#monto_anuncio').val()

    try{
        if(valorSelectMoneda != "" && valorSelectMoneda != null){
            whereSQL += " WHERE mon.iso = '"+valorSelectMoneda+"'";
        }

        if(valorPrecioText != "" && valorPrecioText != null){
            if(whereSQL != "" ){
                whereSQL += " AND "+valorPrecioText+" BETWEEN anun.precio_minimo AND anun.precio_maximo";
            }else{
                whereSQL += " WHERE "+valorPrecioText+" BETWEEN anun.precio_minimo AND anun.precio_maximo";
            }
        }

/*        if(valorSelectPais != "" || valorSelectPais != null)
            if(whereSQL != "")
            whereSQL = " AND mon.iso = '"+valorSelectPais+"'";
            whereSQL = " mon.iso = '"+valorSelectPais+"'";
*/
    }catch(error){
        alert("Error Desconocido en la línea 184 de consultaAnuncios.js \n" + error + "\nPor favor comuniquese con el área de programación ");
    }
    return whereSQL;
}

function asignarTransaccionAnuncio(id_anuncio){
    var query = connection2.query("select nomb_esp from paises order by nomb_esp", function (error, result){
        if (error) {
            alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el área de programación ");
        } else {
            try {
                if (result[0].nomb_esp != null || result[0].nomb_esp != "") {
                    for(i = 0; i < result.length; i++){
                        contenidoSelectPaises += "<option value='"+result[i].nomb_esp+"'>"+result[i].nomb_esp+"</option>";
                    }
                }
                document.getElementById("pais").innerHTML += contenidoSelectPaises; 
            }catch(error){
                alert("Error Desconocido en la línea 168 de consultaAnuncios.js\n" + error + "\nPor favor comuniquese con el área de programación ");
            }
        }
    });
}

