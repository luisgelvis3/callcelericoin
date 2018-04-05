$(document).ready(function() {    
    function verifyCampos(){
        if($('#nombre_comprador').val() == null || $('#nombre_comprador').val() == ""){
            if(consulta_datos_transacciones() === false){
                limpiar_campos();
                //verifyCamposEspera();
                alert("IIIIIIIIIIIIF");
            }else{
                alert("EEEEEEEEEEEELSE");
            }
        }//
    }

    setInterval(verifyCampos, 3000);

    function limpiar_campos(){
        $("#cedula_comprador").val("");
        $("#nombre_comprador").val("");
        $("#telefono_comprador").val("");
        $("#contrasena1_comprador").val("");
        $("#contrasena2_comprador").val("");
        $("#monto").val("");
        $("#nombre_vendedor").val("");
        $("#cedula_vendedor").val("");
        $("#telefono_vendedor").val("");
        $("#contrasena1_vendedor").val("");
        $("#contrasena2_vendedor").val("");
        $("#forma_pago").val("");
    }
});