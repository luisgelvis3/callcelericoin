/** Asesores */
$(document).ready(function(){
    internalProccessVerify = setInterval(listarAsesores, 1000);
});


var id_asesor = "";

function registroNuevo() {

    var cedula_asesor = document.getElementById('cedula').value;
    var nombre_asesor = document.getElementById('nombre').value;
    var apellido_asesor = document.getElementById('apellido').value;
    var celular_asesor = document.getElementById('celular').value;
    var extension_asesor = document.getElementById('extension').value;


    var query = connection.query("INSERT INTO asesores(cedula_asesor,nombre_asesor,apellido_asesor,celular_asesor,extension_asesor) " +
        " VALUES (?,?,?,?,?) ", [cedula_asesor, nombre_asesor, apellido_asesor, celular_asesor, extension_asesor], function (error, result) {
            if (error) {
                alert("Error Desconocido\n" + error + "\nPor favor comuniquese con el area de programacion");
            } else {
                try {
                    var query = connection.query("SELECT id_asesor FROM asesores ORDER BY id_asesor DESC LIMIT 1", function (error, result) {
                        if (error) {
                            alert("Error id llame al area de programacion" + error);
                        } else {
                            $('#modalUsuario').modal('show');
                            id_asesor = result[0].id_asesor;
                        }
                    });
                } catch (error) {
                    alert("Error al registrar" + error);
                }
            }
        });
}

function nuevoUsuario() {
    var nombre_usuario = document.getElementById('nombre_usuario').value;
    var contrasena_usuario = document.getElementById('contrasena').value;

    var query = connection.query("INSERT INTO usuarios(nombre_usuario,contrasena_usuario, estado_usuario, tipo_usuario, ultima_vez_usuario, id_asesor) " +
        "VALUES (?,AES_ENCRYPT(?, UNHEX(SHA2('bc12jD=U\d7MrPr',512))) , 'Ausente', 'Usuario', Now(), ?) ", [nombre_usuario, contrasena_usuario, id_asesor], function (error, result) {
            if (error) {
                alert("Error al registar el usuario pongase en contacto con el area de desarrollo" + error);
            } else {
                try {                    
                    var query = connection.query("UPDATE usuarios SET permiso_usuario = 'Habilitado' WHERE id_asesor = ?",[id_asesor], function(error,result){
                        if(error){
                            alert("Error desconocido "+ error + "Pongase en contacto con el area de programacion");
                        }else{
                            alert("Registro Exitoso");
                            $('#modalUsuario').modal('hide');
                        }
                    })
                } catch (error) {
                    alert("Error pongase en contacto con el area de programacion" + error);
                }
            }
        });
}

function buscarAsesor() {

    var cedula_asesor = document.getElementById('cedula_buscar').value;

    var query = connection.query("SELECT asesores.id_asesor, cedula_asesor, nombre_asesor, apellido_asesor, celular_asesor, extension_asesor, usuarios.nombre_usuario, CONVERT(AES_DECRYPT(usuarios.contrasena_usuario, UNHEX(SHA2('bc12jD=U\d7MrPr',512))), char(100)) As contrasena_usuario, usuarios.permiso_usuario " +
        "FROM asesores JOIN usuarios ON asesores.id_asesor = usuarios.id_asesor WHERE cedula_asesor = ? ", [cedula_asesor], function (error, result) {
            if (error) {
                alert("Error 1 " + error + "Por favor pongase en contacto con el area de programacion");
            } else {
                try {

                    var id = result[0].id_asesor;
                    var cedula = result[0].cedula_asesor;
                    var nombre = result[0].nombre_asesor;
                    var apellido = result[0].apellido_asesor;
                    var celular = result[0].celular_asesor;
                    var extension = result[0].extension_asesor;
                    var usuario = result[0].nombre_usuario;
                    var contrasena = result[0].contrasena_usuario;
                    var permiso = result[0].permiso_usuario;

                    var tabla =
                        "<div class='table-responsive'>" +
                            "<table class='table table-hover'>" +
                                "<thead>" +
                                    "<tr>" +
                                        "<th>Cedula</th>" +
                                        "<th>Nombre</th>" +
                                        "<th>Apellido</th>" +
                                        "<th>Telefono</th>" +
                                        "<th>Extension</th>" +
                                        "<th>Usuario</th>" +
                                        "<th>Contraseña</th>" +
                                        "<th>Estado</th>" +
                                        "<th>" +
                                            "<input type='hidden' id='id_asesor'>" +
                                        "</th>" +
                                        "<th>" +
                                            "<input type='hidden'>" +
                                        "</th>" +
                                    "</tr>" +
                                "</thead>" +
                                "<tbody>" +
                                    "<tr>" +
                                        "<th>" + cedula + "</th>" +
                                        "<th>" + nombre + "</th>" +
                                        "<th>" + apellido + "</th>" +
                                        "<th>" + celular + "</th>" +
                                        "<th>" + extension + "</th>" +
                                        "<th>" + usuario + "</th>" +
                                        "<th>" + contrasena + "</th>" +
                                        "<th>" + permiso + "</th>" +
                                        "<th>" +
                                            "<button class='btn btn-outline-info' onclick='cargarDatos(" + id + ");' data-toggle='modal' data-target='#ModalEditar'>" +
                                                "<i class='fa fa-pencil-square-o' ></i> Editar</button>" +
                                        "</th>" +
                                        "<th>" +
                                            "<button class='btn btn-outline-danger' onclick='eliminarAsesor(" + id + ")'>" +
                                            "<i class='fa fa-trash-o'></i> Eliminar</button>" +
                                        "</th>" +
                                    "</tr>" +
                                "</tbody>" +
                            "</table>" +
                        "</div>"

                    document.getElementById('id_asesor').value = id;
                    document.getElementById('divAsesor').innerHTML = tabla;
                } catch (error) {
                    alert("Error 2 " + error + "Pongase en contacto con el area de programacion");
                }
            }
        });
}

function cargarDatos(id) {

    var query = connection.query("SELECT cedula_asesor, nombre_asesor, apellido_asesor, celular_asesor, extension_asesor, usuarios.nombre_usuario, CONVERT(AES_DECRYPT(usuarios.contrasena_usuario, UNHEX(SHA2('bc12jD=U\d7MrPr',512))), char(100)) As contrasena_usuario " +
        "FROM asesores JOIN usuarios ON asesores.id_asesor = usuarios.id_asesor WHERE asesores.id_asesor = ? ", [id], function (error, result) {
            if (error) {
                alert("Error 1" + error + "Por favor comuniquese con el area de programacion");
            } else {
                try {
                    var cedula_asesor = result[0].cedula_asesor;
                    var nombre_asesor = result[0].nombre_asesor;
                    var apellido_asesor = result[0].apellido_asesor;
                    var celular_asesor = result[0].celular_asesor;
                    var extension_asesor = result[0].extension_asesor;
                    var nombre_usuario = result[0].nombre_usuario;
                    var contrasena_usuario = result[0].contrasena_usuario;

                    document.getElementById('cedula_editar').value = cedula_asesor;
                    document.getElementById('nombre_editar').value = nombre_asesor;
                    document.getElementById('apellido_editar').value = apellido_asesor;
                    document.getElementById('telefono_editar').value = celular_asesor;
                    document.getElementById('extension_editar').value = extension_asesor;
                    document.getElementById('usuario_editar').value = nombre_usuario;
                    document.getElementById('contrasena_editar').value = contrasena_usuario;
                } catch (error) {
                    alert("Error 2" + error + "Por favor comuniquese con el area de programcion");
                }
            }
        });
}

function editarAsesor() {
    var cedula_asesor = document.getElementById('cedula_editar').value;
    var telefono_asesor = document.getElementById('telefono_editar').value;
    var extension_asesor = document.getElementById('extension_editar').value;
    var contasena_usuario = document.getElementById('contrasena_editar').value;

    var query = connection.query("UPDATE usuarios JOIN asesores ON usuarios.id_asesor = asesores.id_asesor " +
        "SET celular_asesor = ?, extension_asesor = ?, usuarios.contrasena_usuario = AES_ENCRYPT(?, UNHEX(SHA2('bc12jD=U\d7MrPr',512))) " +
        "WHERE usuarios.id_asesor = asesores.id_asesor AND cedula_asesor = ?", [telefono_asesor, extension_asesor, contasena_usuario, cedula_asesor], function (error, result) {
            if (error) {
                alert("Error 1 " + error + "Por favor comuniquese con el area de programcion");
            } else {
                try {
                    alert("Cambios realizados");
                } catch (error) {
                    alert("Error 2 " + error + "Por favor comuniquese con el area de desarrollo");
                }
                buscarAsesor();
            }
        });
}

function eliminarAsesor(id) {
    var query = connection.query("UPDATE usuarios SET permiso_usuario = 'Inhabilitado' WHERE id_asesor = ?", [id], function (error, result) {
        if (error) {
            alert("Error 1 " + error + "Por favor comuniquese con el area de programacion");
        } else {
            try {
                alert("Registro Eliminado")
            } catch (error) {
                alert("Error 2 " + error + "Por favor comuniquese con el area de programacion");
            }
            buscarAsesor();
        }
    });
}

function listarAsesores() {
    var query = connection.query("SELECT CONCAT(asesores.nombre_asesor, ' ', asesores.apellido_asesor) As nombre_asesor, usuarios.estado_usuario " +
        "FROM asesores JOIN usuarios ON asesores.id_asesor = usuarios.id_asesor " +
        "WHERE asesores.id_asesor = usuarios.id_asesor " +
        "AND usuarios.tipo_usuario = 'Usuario' " +
        "AND usuarios.permiso_usuario = 'Habilitado'", function (error, result) {
            if (error) {
                alert("Error 1 " + error + "Por favor comuniquese con el area de programacion");
            } else {
                var text = "";
                try {
                    if (result[0].nombre_asesor != "" && result[0].nombre_asesor != null) {
                        for (var i = 0; i < result.length; i++) {

                            if (result[i].estado_usuario === "Disponible") {
                                text +=
                                "<div class = 'col-7'>" +
                                    "<img src='../img/usuario.png' class='img' alt=''> " + i + " " + result[i].nombre_asesor +
                                "</div>" +
                                "<div class = 'col-1'>" +
                                    "<div class='estado-circle-disponible'></div>" +
                                "</div>" +
                                "<div class='col-4' style='text-align: center;'>" + result[i].estado_usuario + "</div>"
                            } else if (result[i].estado_usuario === "Ausente") {
                                text +=
                                "<div class = 'col-7'>" +
                                    "<img src='../img/usuario.png' class='img' alt=''> " + i + " " + result[i].nombre_asesor +
                                "</div>" +
                                "<div class = 'col-1'>" +
                                    "<div class='estado-circle-ausente'></div>" +
                                "</div>" +
                                "<div class='col-4' style='text-align: center;'>" + result[i].estado_usuario + "</div>"
                            } else if (result[i].estado_usuario === "Ocupado") {
                                text +=
                                "<div class = 'col-7'>" +
                                    "<img src='../img/usuario.png' class='img' alt=''> " + i + " " + result[i].nombre_asesor +
                                "</div>" +
                                "<div class = 'col-1'>" +
                                    "<div class='estado-circle-ocupado'></div>" +
                                "</div>" +
                                "<div class='col-4' style='text-align: center;'>" + result[i].estado_usuario + "</div>"
                            }
                        }
                    }
                } catch (error) {
                    alert(error);
            }
            document.getElementById("container_asesor").innerHTML = text;
        }        
    });    
}

/** Estado de los asesores  */

/** Generar reportes */

function reporteLlamadas() {
    var cedula_historial = document.getElementById('cedula_historial').value;
    var fecha_historial = document.getElementById('fecha_historial').value;

    

}