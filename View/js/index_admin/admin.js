
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

function buscarAsesor(){

    var cedula_asesor = document.getElementById('cedula_buscar').value;

    var query = connection.query("SELECT asesores.id_asesor, cedula_asesor, nombre_asesor, apellido_asesor, celular_asesor, extension_asesor, usuarios.nombre_usuario, CONVERT(AES_DECRYPT(usuarios.contrasena_usuario, UNHEX(SHA2('bc12jD=U\d7MrPr',512))), char(100)) As contrasena_usuario "+
    "FROM asesores JOIN usuarios ON asesores.id_asesor = usuarios.id_asesor WHERE cedula_asesor = ? ", [cedula_asesor], function(error,result){
        if(error){
            alert("Error 1 "+ error + "Por favor pongase en contacto con el area de programacion");
        }else{
            try {    
                
                var id = result[0].id_asesor;
                var cedula = result[0].cedula_asesor;
                var nombre = result[0].nombre_asesor;
                var apellido = result[0].apellido_asesor;
                var celular = result[0].celular_asesor;
                var extension = result[0].extension_asesor;
                var usuario = result[0].nombre_usuario;
                var contrasena = result[0].contrasena_usuario;
                
                var tabla = 
                "<div table-responsive>"+
                    "<table class='table table-hover'>"+
                        "<thead>"+
                            "<tr>"+
                                "<th>Cedula</th>"+
                                "<th>Nombre</th>"+
                                "<th>Apellido</th>"+
                                "<th>Telefono</th>"+
                                "<th>Extension</th>"+
                                "<th>Usuario</th>"+
                                "<th>Contraseña</th>"+
                                "<th>"+
                                    "<input type='hidden' id='id_asesor'>"+
                                "</th>"+
                                "<th>"+
                                    "<input type='hidden'>"+
                                "</th>"+
                            "</tr>"+
                        "</thead>"+
                        "<tbody>"+
                            "<tr>"+
                                "<th>"+ cedula + "</th>"+
                                "<th>"+ nombre + "</th>"+
                                "<th>"+ apellido + "</th>"+
                                "<th>"+ celular + "</th>"+
                                "<th>"+ extension + "</th>"+
                                "<th>"+ usuario + "</th>"+
                                "<th>"+ contrasena + "</th>"+
                                "<th>"+
                                    "<button class='btn btn-outline-info' data-toggle='modal' data-target='#ModalEditar'>"+
                                        "<i class='fa fa-pencil-square-o' ></i> Editar</button>"+
                                "</th>"+
                                "<th>"+
                                    "<button class='btn btn-outline-danger'>"+
                                        "<i class='fa fa-trash-o'></i> Eliminar</button>"+
                                "</th>"+
                            "</tr>"+
                        "</tbody>"+
                    "</table>"+
                "</div>"

                document.getElementById('id_asesor').value = id;
                document.getElementById('divAsesor').innerHTML = tabla;
            } catch (error) {
                alert("Error 2 "+ error +"Pongase en contacto con el area de programacion");
            }
        }
    });

}