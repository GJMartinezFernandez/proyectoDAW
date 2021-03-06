$(document).ready(function () {
    var modal = $("#myModal");
    var spanUsuario = $("#usuario");
    var btn = $("#myBtn");
    var inputName = $('#nombre');
    var inputId = $('#id');
    var balance = $('#balance');
    var botonCerrar = $('#btnCerrar');
    var botonCoins = $('#btnCoins');
    botonCoins.hide();
    botonCerrar.hide();
    //logearse
    $('#formLogin').keypress(function (e) {
        if (e.which == 13) {
            $('#submitLogin').click()
        }
    })
    $('#submitLogin').click(function () {
        var object = $('#formLogin').serializeArray().reduce(function (a, x) {
            a[x.name] = x.value;
            return a;
        }, {});
        object.password = SHA256(object.password)
        var data = JSON.stringify(object);
        console.log(data);
        $.ajax({
            type: 'get'
            , url: 'services/server/login/' + data
            , success: function (response) {
                //añadir un div con una ruleta girando para dar la sensacion de carga
                console.log(response);
                if (response == 'Fail') {
                    alert("No existe el usuario");
                }
                else {
                    modal.css("display", "none");
                    btn.css("display", "none");
                    var respuesta = JSON.parse(response);
                    balance.text(respuesta.coins);
                    spanUsuario.text(respuesta.name);
                    inputName.val(respuesta.name);
                    inputName.val(respuesta.id);
                    botonCerrar.show();
                    botonCoins.show();
                    console.log("login correcto");
                    setCookie("usuario", response, 1)
                }
            }
            , error: function (xhr, status, error, exc) {
                console.log(exc);
            }
        });
    });
    //Registrarse
    $('#submitRegister').click(function () {
        var object = $('#formRegister').serializeArray().reduce(function (a, x) {
            a[x.name] = x.value;
            return a;
        }, {});
        object.password = SHA256(object.password)
        var data = JSON.stringify(object);
        console.log(data);
        $.ajax({
            type: 'get'
            , url: 'services/server/register/' + data
            , success: function (response) {
                //añadir un div con una ruleta girando para dar la sensacion de carga
                console.log("Registros antes de explotar");
                modal.css("display", "none");
                btn.css("display", "none");
                var respuesta = JSON.parse(response);
                spanUsuario.text(respuesta.name);
                balance.text(respuesta.coins);
                botonCerrar.show();
                botonCoins.show();
                inputName.val(respuesta.name);
                inputName.val(respuesta.id);
                console.log("Registro correcto");
                setCookie("usuario", response, 1)
            }
            , error: function (xhr, status, error, exc) {
                console.log(exc);
            }
        });
    });
});