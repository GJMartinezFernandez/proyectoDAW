var listaApuestas = [];

function Apuesta(id, coins, color) {
    this.id = id;
    this.coins = coins;
    this.color = color;
}

function comprobarCookie() {
    if (getCookie("usuario") == "") {
        return 0
    }
    else {
        return 1
    }
}
$(document).ready(function () {
    var boton = $('.span4 > button');
    for (var i = 0; i < boton.length; i++) {
        boton[i].addEventListener('click', apostar);
    }
    traerApuestas();
});

function traerApuestas() {
    $.ajax({
        url: 'services/server/apuestasRealizadas/'
        , type: 'get'
        , dataType: "json"
        , success: function (response) {
            console.log(response);
            var p;
            for (var i = 0; i < response.length; i++) {
                switch (response[i].color) {
                case "rojo":
                    p = $('#btnRojo').next();
                    break;
                case "verde":
                    p = $('#btnVerde').next();
                    break;
                case "negro":
                    p = $('#btnNegro').next();
                    break;
                }
                p.append('<span class="apuestasNombre">' + response[i].nombre + '</span><span class="apuestasCantidad">' + response[i].coins + '</span><br>');
            }
        }
        , error: function () {
            console.log("error")
        }
    });
}

function apostar() {
    if (comprobarCookie("usuario") == 0) {
        return 0
    }
    var usuario = JSON.parse(getCookie("usuario"))
    var boton = $(this);
    var p = boton.next();
    var coins = $('#dineroApuesta').val();
    var balance = parseInt($('#balance').text());
    var color = colorApostado($(this).attr("id"));
    var jug = new Apuesta(usuario.id, coins, color);
    var json = JSON.stringify(jug);
    var nombre = $('#usuario').text();
    //TODO Falta recuperar nombre del jugador
    if (coins <= balance && coins > 0) {
        listaApuestas[listaApuestas.length] = jug;
        $.ajax({
            url: 'services/server/apostar/' + json
            , type: 'get'
            , dataType: "json"
            , success: function (response) {
                if (response == 1) {
                    boton.prop("disabled", true);
                    pintar(json, false);
                    var apuestaNueva = new apuestaRecibida(nombre, coins, color);
                    send(JSON.stringify(apuestaNueva));
                }
            }
            , error: function () {
                console.log("error")
            }
        });
    }
}

function activarBotones() {
    var botonR = $('.btnRojo');
    var botonV = $('.btnVerde');
    var botonN = $('.btnNegro');
    botonR.prop("disabled", false);
    botonV.prop("disabled", false);
    botonN.prop("disabled", false);
}

function bloquearBotones() {
    var botonR = $('.btnRojo');
    var botonV = $('.btnVerde');
    var botonN = $('.btnNegro');
    botonR.prop("disabled", true);
    botonV.prop("disabled", true);
    botonN.prop("disabled", true);
}

function pintar(json, bool) {
    var balance = $('#balance');
    var apuesta = $('#apuesta');
    var txtBalance = parseInt(balance.text());
    var nuevoBalance = "";
    var ganadores = JSON.parse(json);
    //apuestas ganadass
    if (bool) {
        $(apuesta).css("right", "10px");
        $(apuesta).css("opacity", "1")
        $(apuesta).css("color", "green");
        //esta sera la cantidad que hemos ganado cuando el server la calcule y nos la devuelva
        apuesta.text("+" + parseInt(ganadores.coins));
        nuevoBalance = txtBalance + parseInt(ganadores.coins);
        $(balance).fadeTo(350, 0, function () {
            $(this).text(nuevoBalance).fadeTo(350, 1);
        });
        $(apuesta).fadeTo(1500, 0).animate({
            'right': '90px'
        }, {
            duration: 1500
            , queue: false
        }, function () {
            //Animacion completada.a
        });
        //apuestas perdidas
    }
    else {
        $(apuesta).css("right", "10px");
        $(apuesta).css("opacity", "1")
        $(apuesta).css("color", "red");
        //esta sera la cantidad que perdemos de lo apostado se obtiene del objeto antes de enviarlo
        apuesta.text("-" + parseInt(ganadores.coins));
        nuevoBalance = txtBalance - parseInt(ganadores.coins);
        $(balance).fadeTo(350, 0, function () {
            $(this).text(nuevoBalance).fadeTo(350, 1);
        });
        $(apuesta).fadeTo(1500, 0).animate({
            'right': '90px'
        }, {
            duration: 1500
            , queue: false
        }, function () {
            //Animacion completada.
        });
    }
    var cookie = JSON.parse(getCookie("usuario"))
    cookie.coins = nuevoBalance
    cookie = JSON.stringify(cookie)
    setCookie("usuario", cookie, 1)
}

function colorApostado(id) {
    var color;
    switch (id) {
    case "btnRojo":
        color = "rojo";
        break;
    case "btnVerde":
        color = "verde";
        break;
    case "btnNegro":
        color = "negro";
        break;
    }
    return color;
}