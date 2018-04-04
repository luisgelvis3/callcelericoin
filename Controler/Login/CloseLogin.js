function cerrarSession() {

    var query = connection.query("select * from usuarios where id_usuario = ?", [id_usuario_get], function (error, result){
        if (error) {
            console.log(error);
            alert("error: " + error)
        }else {
        var id = result[0].id_usuario;
        var query = connection.query("UPDATE usuarios SET estado_usuario = 'Ausente' WHERE id_usuario = ? ", [id], function (error, result) {
            if (error) {
                throw error;
                alert(error);
                return false;
            } else {
                return true;
            }
        });
        location.href = "../../login.html";
    }
    });
}
    
/*
CREATE DEFINER=`usuario1`@`%` TRIGGER `asignacion_llamada` AFTER INSERT ON `transferencias` FOR EACH ROW BEGIN
DECLARE id_usuario_asignado int(11);
SET id_usuario_asignado = (
SELECT usu.id_usuario 
FROM callcenter.usuarios usu 
WHERE usu.estado_usuario = 'Disponible' AND usu.tipo_usuario = 'Usuario' 
ORDER BY usu.ultima_vez_usuario ASC 
LIMIT 1);
IF(id_usuario_asignado) IS NOT NULL THEN
	INSERT INTO callcenter.asignaciones_llamadas(fecha_hora_inicio_asignacion, estado_asignacion, id_intercambio, id_usuario)
	VALUES (NOW(), 'Asignado', NEW.id, id_usuario_asignado);
	UPDATE callcenter.usuarios SET estado_usuario = 'Ocupado' WHERE id_usuario = id_usuario_asignado;
ELSE
	INSERT INTO callcenter.llamadas_entrantes(id_transferencia, fecha_hora_llamada_entrante)
    VALUES (NEW.id, NOW());
END IF;
END
*/
