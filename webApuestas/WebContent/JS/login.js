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
             console.log(response);
             
            if(response == 'Fail'){
                            
                 alert("No existe el usuario");

            }else{
                      
                            
                 balance.text(respuesta.coins);
                 spanUsuario.text(respuesta.name);
                 inputName.val(respuesta.name);
                 inputName.val(respuesta.id);
                 console.log("login correcto");
            }
                       
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
                        spanUsuario.text(respuesta.name);
                        balance.text(respuesta.coins);
                        inputName.val(respuesta.name);
                        inputName.val(respuesta.id);
                        console.log("Registro correcto");

          },
          error: function(xhr, status, error,exc) {
                     console.log(exc);
                 }
      });
    });
    
});