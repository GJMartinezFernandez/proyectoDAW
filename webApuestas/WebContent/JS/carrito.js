var total = 0
$(document).ready(function () {
    initCart()
    $('#btn-comprar').click(function () {
        var jsonFinal = {};
        var cantidades = [];
        var ids = []
        $('.inp-cantidad').each(function (key, element) {
            cantidades.push($(element).val());
            ids.push($(element).attr("id"));
        });
        for (i in cantidades) {
            jsonFinal[i] = {
                id: ids[i]
                , cantidad: cantidades[i]
            }
        }
        var jsonStringCompra = JSON.stringify(jsonFinal)
        $.ajax({
            type: 'GET'
            , url: 'services/server/comprafinal/' + jsonStringCompra
            , success: function (data) {
                alert("Compra realizada correctamente")
            }
        })
    })
})

function initCart() {
    //console.log("Cookie: " + getCookie("carrito"))
    var arrayIds = getCookie("carrito").split(',')
        //console.log("Array split:" + arrayIds)
    var json = [];
    for (i in arrayIds) {
        json[i] = arrayIds[i]
    }
    var jsonString = JSON.stringify(json)
        //console.log("JSON Stringify: " + JSON.stringify(json))
    $.ajax({
        type: 'GET'
        , url: 'services/server/getcarrito/' + jsonString
        , success: function (data) {
            var json = JSON.parse(data)
                //console.log(json)
            for (i in json) {
                var id = json[i].id
                var name = json[i].name
                var stock = json[i].stock
                var price = json[i].price
                var image = json[i].image
                stock = comprobarStock(stock)
                createTr(id, name, stock, price, image)
            }
            $('#total').text(total + " Coins")
        }
    });
}

function createTr(id, name, stock, price, image) {
    //var cantidad = $('#cantidad').value()
    //$('#addRow').empty()
    var cantidad = 1
    $('#addRow').prepend('<tr> <td class="col-sm-8 col-md-6"><div class="media"> <a class ="thumbnail pull-left" href="#"> <img class="media-object" src="' + image + '" style="width: 72px; height: 72px;"></a><div class="media-body"><h4 class="media-heading"> <a href="#">' + name + '</a></h4><h5 class="media-heading">Num Ref: ' + id + '</h5><span> Estado: </span><span class="text-success">' + stock + '</span></div></div></td><td class="col-sm-1 col-md-1" style="text-align: center"><input type="email" class="form-control inp-cantidad" value="' + cantidad + '" id="' + id + '"></td><td class="col-sm-1 col-md-1 text-center"><strong>' + price + ' Coins</strong></td><td class="col-sm-1 col-md-1 text-center"><strong>' + price * cantidad + ' Coins</strong></td><td class="col-sm-1 col-md-1"><button type="button" class="btn btn-danger btn-remove" id="' + id + '"><span class="glyphicon glyphicon-remove"></span> Remove </button></td></tr>');
    total = total + (price * cantidad)
}
$(document).on('click', '.btn-remove', function () {
    var present = $(this).attr("id")
        //console.log(present)
    var arrayIds = getCookie("carrito").split(',')
        //console.log(arrayIds)
    for (i in arrayIds) {
        if (arrayIds.indexOf(present) >= 0) {
            arrayIds.splice(i, 1)
        }
    }
    //console.log(arrayIds)
    setCookie("carrito", arrayIds, 1)
    location.reload();
});
$(document).on('keypress', '.inp-cantidad', function (e) {
    if (e.which == 13) {
        var cantidad = $(this).val()
        var priceTxt = $(this).parent().next().children(0).text()
        var price = parseFloat(priceTxt.substr(0, priceTxt.indexOf('C')))
        var total = cantidad * price
            //console.log(price)
        var totalAntiguo = parseFloat($(this).parent().next().next().children(0).text().substr(0, $(this).parent().next().next().children(0).text().indexOf('C')))
        console.log(totalAntiguo)
        $(this).parent().next().next().children(0).text(total + " Coins")
        var totalFinal = $('#total').text().substr(0, $('#total').text().indexOf('C'))
        totalFinal = (totalFinal - totalAntiguo) + total
        $('#total').text(totalFinal + " Coins")
    }
});

function comprobarStock(stock) {
    var html = ""
    switch (true) {
    case stock > 10:
        html = '<strong class="stock stock-verde">En Stock</strong>'
        break;
    case stock <= 10 && stock > 0:
        html = '<strong class="stock stock-amarillo">En Stock</strong>'
        break;
    }
    return html
}

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