$(document).ready(function () {
    var modal = $("#myModal");
    var btn = $("#myBtn");
    var span = $(".closePrueba");
    btn.click(function () {
        modal.css("display", "block");
    });
    span.click(function () {
        modal.css("display", "none");
    });
    window.click = function (event) {
        if (event.target == modal) {
            modal.css("display", "none");
        }
    }
    if (getCookie("usuario") != "") {
        $('#myBtn').hide()
        var cookie = JSON.parse(getCookie("usuario"))
        $('#usuario').text(cookie.name)
        $('#balance').text(cookie.coins)
        $('#btnCerrar').show()
    }
    $('#btnCerrar').click(function () {
        deleteCookie("usuario")
            //setCookie("usuario", "", 1)
        location.reload()
    })
    $('#limpiar').click(function () {
        $("#dineroApuesta").val(0)
    })
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getObjectKeyIndex(obj, keyToFind) {
    var i = 0
        , key;
    for (key in obj) {
        if (obj[key].id == keyToFind) {
            return i;
        }
        i++;
    }
    return null;
}

function comprobarCookie() {
    if (getCookie("usuario") == "") {
        return 0
    }
    else {
        return 1
    }
}

function countItems() {
    var count = 0;
    aux = getCarrito()
    for (i in aux) {
        count = count + aux[i].cantidad
    }
    return count
}

function getCarrito() {
    var carrito = []
    aux = getCookie("carrito")
    if (aux == "") {
        return []
    }
    else {
        return JSON.parse(getCookie("carrito"))
    }
}

function deleteCookie(cname) {
    var expires = "expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = cname + "=" + "" + ";" + expires + ";path=/";
};