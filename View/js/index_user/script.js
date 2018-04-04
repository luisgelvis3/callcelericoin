$(document).ready(function() {    
    function verifyCampos(){
        if($('#nombre_comprador').val() == null && $('#nombre_comprador').val() != ""){
            alert('Prueba');
        }
    }

    setInterval(verifyCampos(), 3000);
});