$(document).ready(function(){
    var modal = $("#myModal");
    var spanUsuario = $("#usuario");
  	var btn = $("#myBtn");
    var inputName = $('#nombre');
    var inputId = $('#id');
    var balance = $('#balance');
//logearse
$('#submitLogin').click(function(){
   var data = JSON.stringify( $('#formLogin').serialize());
    console.log(data);
  $.ajax({
    type: 'get',
    dataType: "json",
    url:   'services/server/login/' + data,
    success:  function (response) {
      //añadir un div con una ruleta girando para dar la sensacion de carga
                    modal.css("display","none");
                    btn.css("display","none");
                    var respuesta = JSON.parse(response);
                    balance.text(respuesta.cantidad);
                    spanUsuario.text(respuesta.nombre);
                    inputName.val(respuesta.nombre);
                    inputName.val(respuesta.id);
                    cosole.log("login correcto");

      },
      error: function (){
                    console.log("error")
      }
  });
});
//Registrarse
$('#submitRegister').click(function(){
   var data = JSON.stringify( $('#formRegister').serialize());
    
  $.ajax({
    type: 'get',
    dataType: "json",
    url:   'services/server/register/' + data,
    success:  function (response) {
        //añadir un div con una ruleta girando para dar la sensacion de carga
                    modal.css("display","none");
                    btn.css("display","none");
                    var respuesta = JSON.parse(response);
                    spanUsuario.text(respuesta.nombre);
                    inputName.val(respuesta.nombre);
                    inputName.val(respuesta.id);
                    cosole.log("login correcto");

      },
      error: function (){
                    console.log("error")
                    console.log(data);
      }
  });
});
});