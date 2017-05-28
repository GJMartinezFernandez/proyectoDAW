$(document).ready(function(){
    var modal = $("#myModal");
    var spanUsuario = $("#usuario");
  	var btn = $("#myBtn");
    var inputName = $('#nombre');
    var inputId = $('#id');
    var balance = $('#balance');
//logearse
    $('#submitLogin').click(function(){

        var object = $('#formLogin').serializeArray()
            .reduce(function(a, x) { 
                         a[x.name] = x.value; return a;
                    }, {});
        
        var data = JSON.stringify(object);
        console.log(data);

      $.ajax({
        type: 'get',
        url:   'services/server/login/' + data,
        success:  function (response) {
          //añadir un div con una ruleta girando para dar la sensacion de carga
                        console.log("Dentro antes de explotar");
                        modal.css("display","none");
                        btn.css("display","none");
                        var respuesta = JSON.parse(response);
                        balance.text(respuesta.cantidad);
                        spanUsuario.text(respuesta.nombre);
                        inputName.val(respuesta.nombre);
                        inputName.val(respuesta.id);
                        console.log("login correcto");

          },
          error: function(xhr, status, error,exc) {
                    console.log(exc);
                 }
      });
    });
    
    //Registrarse
    $('#submitRegister').click(function(){

           var object = $('#formRegister').serializeArray()
            .reduce(function(a, x) {
                        a[x.name] = x.value; return a; 
                    }, {});
        
           var data = JSON.stringify(object);
           console.log(data);

      $.ajax({
        type: 'get',
        url:   'services/server/register/' + data,
        success:  function (response) {
            //añadir un div con una ruleta girando para dar la sensacion de carga
                        console.log("Registros antes de explotar");
                        modal.css("display","none");
                        btn.css("display","none");
                        var respuesta = JSON.parse(response);
                        spanUsuario.text(respuesta.nombre);
                        inputName.val(respuesta.nombre);
                        inputName.val(respuesta.id);
                        console.log("Registro correcto");

          },
          error: function(xhr, status, error,exc) {
                     console.log(exc);
                 }
      });
    });
    
});