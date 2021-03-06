var total = 0
var json = ""
$(document).ready(function () {
    initCart()
    $('#btn-comprar').click(function () {
        var jsonFinal = [];
        var cantidades = [];
        var ids = []
        $('.inp-cantidad').each(function (key, element) {
            cantidades.push($(element).val());
            ids.push($(element).attr("id"));
        });
        for (i in cantidades) {
            jsonFinal[i] = {
                id: ids[i]
                , stock: cantidades[i]
            }
        }
        var jsonStringCompra = JSON.stringify(jsonFinal)
        var usuario = JSON.parse(getCookie("usuario"))
        if (usuario.coins >= total) {
            $.ajax({
                type: 'GET'
                , url: 'services/server/comprar/' + jsonStringCompra
                , success: function (data) {
                    deleteCookie("carrito")
                    location.reload()
                    alert("Compra realizada correctamente")
                }
            })
        }
        else {
            alert("No tienes suficientes Coins")
        }
    })
})

function initCart() {
    //console.log("Cookie: " + getCookie("carrito"))
    var json = getCarrito()
    console.log(json)
    var jsonString = JSON.stringify(json)
        //console.log("JSON Stringify: " + JSON.stringify(json))
    $.ajax({
        type: 'GET'
        , url: 'services/server/getcarrito/' + jsonString
        , success: function (data) {
            json = JSON.parse(data)
            console.log(json)
            for (i in json) {
                var id = json[i].id
                var name = json[i].name
                var stock = json[i].stock
                var price = json[i].price
                var image = json[i].image
                var cantidad = json[i].cantidadComprada
                stock = comprobarStock(stock)
                createTr(id, name, stock, cantidad, price, image)
            }
            $('#total').text(total + " Coins")
        }
    });
}

function createTr(id, name, stock, cantidad, price, image) {
    //var cantidad = $('#cantidad').value()
    //$('#addRow').empty()
    $('#addRow').prepend('<tr> <td class="col-sm-8 col-md-6"><div class="media"> <a class ="thumbnail pull-left" href="#"> <img class="media-object" src="' + image + '" style="width: 72px; height: 72px;"></a><div class="media-body"><h4 class="media-heading"> <a href="#">' + name + '</a></h4><h5 class="media-heading">Num Ref: ' + id + '</h5><span> Estado: </span><span class="text-success">' + stock + '</span></div></div></td><td class="col-sm-1 col-md-1" style="text-align: center"><input type="email" class="form-control inp-cantidad" value="' + cantidad + '" id="' + id + '"></td><td class="col-sm-1 col-md-1 text-center"><strong>' + price + ' Coins</strong></td><td class="col-sm-1 col-md-1 text-center"><strong>' + price * cantidad + ' Coins</strong></td><td class="col-sm-1 col-md-1"><button type="button" class="btn btn-danger btn-remove" id="' + id + '"><span class="glyphicon glyphicon-remove"></span> Remove </button></td></tr>');
    total = total + (price * cantidad)
}
$(document).on('click', '.btn-remove', function () {
    var present = $(this).attr("id")
        //console.log(present)
    var cookie = JSON.parse(getCookie("carrito"))
        //console.log(arrayIds)
    var index = getObjectKeyIndex(cookie, present)
    cookie.splice(index, 1)
    cookie = JSON.stringify(cookie)
        //console.log(arrayIds)
    setCookie("carrito", cookie, 1)
    location.reload();
});
$(document).on('keypress', '.inp-cantidad', function (e) {
    if (e.which == 13) {
        var cantidad = $(this).val()
        var id = $(this).attr("id")
        var index = getObjectKeyIndex(json, id)
        console.log(json)
        console.log(id)
        console.log(index)
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