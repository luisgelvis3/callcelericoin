$(document).ready(function() {    
    function verifyCampos(){
        if($('#nombre_comprador').val() == null && $('#nombre_comprador').val() != ""){
            consulta_datos_transacciones();
        }
        
    }

    setInterval(verifyCampos, 3000);
});