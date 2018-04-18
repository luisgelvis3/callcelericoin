
function validacionLogin() {
    //import { Session } from "electron";
    // Leer los datos que se ingresaron al formulario y asignarlos a variables
    // select id_usuario, nombre_usuario, AES_DECRYPT(contrasena_usuario, UNHEX(SHA2('bc12jD=U\d7MrPr',512))) as contrasena_usuario, estado_usuario from usuarios where nombre_usuario = 'davidcluna' and contrasena_usuario = AES_ENCRYPT("1234", UNHEX(SHA2('bc12jD=U\d7MrPr',512)))
    // INSERT INTO usuarios(nombre_usuario, contrasena_usuario, tipo_usuario,estado_usuario, id_asesor) VALUES ('luisgelvis',AES_ENCRYPT("1234", UNHEX(SHA2('bc12jD=U\d7MrPr',512))), 'Usuario','Disponible', '1');
    var var_nombre_usuario = document.getElementById('username').value;
    var var_contrasena_usuario = document.getElementById('pass').value;

    var query = connection.query("SELECT usu.id_usuario, usu.nombre_usuario, usu.tipo_usuario, "+
    "CONVERT(AES_DECRYPT(usu.contrasena_usuario, UNHEX(SHA2('bc12jD=U\d7MrPr',512))), char(100)) AS contrasena_usuario, "+
    "usu.estado_usuario, ase.nombre_asesor, ase.apellido_asesor, ase.extension_asesor "+
    "FROM usuarios usu JOIN asesores ase "+
    "ON usu.id_asesor = ase.id_asesor "+
    "WHERE usu.nombre_usuario = ? AND usu.contrasena_usuario = AES_ENCRYPT( ? , UNHEX(SHA2('bc12jD=U\d7MrPr',512)))", [var_nombre_usuario, var_contrasena_usuario], function (error, result) {
        if (error) {
            console.log(error);
            alert("error: " + error);
        } else {
            try {
                if (result[0].nombre_usuario === var_nombre_usuario && result[0].contrasena_usuario === var_contrasena_usuario) {
                    if (result[0].tipo_usuario === "Usuario") {
                        var userName = result[0].nombre_asesor;
                        var lastName = result[0].apellido_asesor;
                        var id = result[0].id_usuario
                        var query = connection.query("UPDATE usuarios SET estado_usuario = 'Disponible', ultima_vez_usuario = NOW() WHERE id_usuario = ? ", [id], function (error, result) {
                            if (error) {
                                throw error;
                                alert(error);
                                return false;
                            } else {                                
                                return true;
                            }
                        });
                        location.href = "./View/html/index.html?nombreusuario="+userName+"&apellidousuario="+ lastName+"&id_usuario=" + id;
                    } else if (result[0].tipo_usuario === "Administrador") {
                        var userName = result[0].nombre_usuario;
                        var lastName = result[0].apellido_asesor;
                        var id = result[0].id_usuario;
                        var query = connection.query("UPDATE usuarios SET estado_usuario = 'Disponible', ultima_vez_usuario = NOW() WHERE id_usuario = ? ", [id], function (error, result) {
                            if (error) {
                                throw error;
                                alert(error);
                                return false;
                            } else {
                                return true;
                            }
                        });
                        location.href = "./View/admin/index.html?nombreusuario="+userName+"&apellidousuario="+ lastName+"&id_usuario=" + id;
                    }
                } else {
                    alert('Usuario o Contraseñas Incorrectas 1');
                }
            } catch (error) {
                console.log(error);
                alert('Usuario o Contraseñas Incorrectas 2');
            }
        }

        
    });
    
}