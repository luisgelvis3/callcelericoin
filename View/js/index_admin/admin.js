
 var id_asesor = "";

function registroNuevo(){

    var cedula_asesor = document.getElementById('cedula').value;
    var nombre_asesor =  document.getElementById('nombre').value;
    var apellido_asesor = document.getElementById('apellido').value;
    var celular_asesor = document.getElementById('celular').value;
    var extension_asesor = document.getElementById('extension').value;


    var query = connection.query("INSERT INTO asesores(cedula_asesor,nombre_asesor,apellido_asesor,celular_asesor,extension_asesor) "+ 
    " VALUES (?,?,?,?,?) ", [cedula_asesor, nombre_asesor, apellido_asesor, celular_asesor, extension_asesor], function(error,result){
        if(error){
            alert("Error Desconocido\n"+ error + "\nPor favor comuniquese con el area de programacion");
        }else{
            try{
                var query = connection.query("SELECT id_asesor FROM asesores ORDER BY id_asesor DESC LIMIT 1", function(error,result){
                    if(error){
                        alert("Error id llame al area de programacion"+ error);
                    }else{
                        $('#modalUsuario').modal('show');
                        id_asesor = result[0].id_asesor;
                    }
                });                
            } catch (error){
                alert("Error al registrar"+ error);
            }
        }
    });
}

function nuevoUsuario(){
    var nombre_usuario = document.getElementById('nombre_usuario').value;
    var contrasena_usuario = document.getElementById('contrasena').value;

    var query = connection.query("INSERT INTO usuarios(nombre_usuario,contrasena_usuario, estado_usuario, tipo_usuario, ultima_vez_usuario, id_asesor) "+
    "VALUES (?,AES_ENCRYPT(?, UNHEX(SHA2('bc12jD=U\d7MrPr',512))) , 'Ausente', 'Usuario', Now(), ?) ", [nombre_usuario, contrasena_usuario, id_asesor], function(error,result){
        if(error){
            alert("Error al registar el usuario pongase en contacto con el area de desarrollo"+ error);
        }else{
            try {
                alert("Registro Exitoso");
                $('#modalUsuario').modal('hide');
            } catch (error) {
                alert("Error pongase en contacto con el area de programacion"+ error);
            }
        }
    });
}