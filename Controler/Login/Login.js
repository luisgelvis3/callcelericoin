function validacionLogin() {

    // Leer los datos que se ingresaron al formulario y asignarlos a variables
    var var_nombre_usuario = document.getElementById('username').value;
    var var_contrasena_usuario = document.getElementById('pass').value;

    var query = connection.query('select * from usuarios where nombre_usuario = ? and contrasena_usuario = ?', [var_nombre_usuario,var_contrasena_usuario], function(error, result){
        if(error){
            console.log(error);
            alert("error: "+error);
        }else{
            try{
                if(result[0].nombre_usuario === var_nombre_usuario && result[0].contrasena_usuario === var_contrasena_usuario){
                    if(result[0].tipo_usuario === "usuario"){
                        location.href = "./View/html/index.html";
                    }else if(result[0].tipo_usuario === "administrador"){
                        location.href = "./View/html/admin.html";
                    }
                }else{
                    alert('Usuario o Contraseñas Incorrectas');
                }
            }catch(error){
                alert('Usuario o Contraseñas Incorrectas');
            }
        }
    });
}