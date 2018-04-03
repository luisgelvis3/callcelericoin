function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? " " : decodeURIComponent(results[1].replace(/\+/g, "    "));
}

var varnombreusuario = getParameterByName('nombreusuario');
var varapellidousuario = getParameterByName('apellidousuario');
var id_usuario_get = getParameterByName('id_usuario');
document.getElementById("nameUsuario").innerHTML = varnombreusuario+" "+varapellidousuario;
document.getElementById("idUsuario").value = id_usuario_get;