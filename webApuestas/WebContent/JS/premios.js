$(document).ready(function () {
    var carrito = getCarrito()
    var count = countItems()
    $('#num_items').text("(" + count + ")")
    $.ajax({
        type: 'GET'
        , url: 'services/server/getpresents'
        , success: function (data) {
            var json = JSON.parse(data)
            for (i in json) {
                var id = json[i].id
                var name = json[i].name
                var stock = json[i].stock
                var price = json[i].price
                var image = json[i].image
                var button = printButtonAddCart(stock, id)
                stock = comprobarStock(stock)
                createPresent(id, name, stock, price, image, button)
            }
        }
    });
    $(document).on('click', '.btn-add', function () {
        var present = $(this).attr("id")
        carrito.push(present)
        setCookie("carrito", carrito, 1)
        //console.log(document.cookie)
        //console.log(carrito)
        alert("Añadido Al Carrito")
        var count = countItems()
        $('#num_items').text("(" + count + ")")
    });
});

function countItems() {
    var count = 0;
    aux = getCarrito()
    count = aux.length
    return count
}

function getCarrito() {
    var carrito = []
    aux = getCookie("carrito")
    if (aux != "") {
        carrito = aux.split(',')
        return carrito
    }
    else {
        return carrito
    }
}

function comprobarStock(stock) {
    var html = ""
    switch (true) {
    case stock > 10:
        html = '<p class="stock stock-verde"> En Stock </p>'
        break;
    case stock <= 10 && stock > 0:
        html = '<p class="stock stock-amarillo"> En Stock </p>'
        break;
    case stock <= 0:
        html = '<p class="stock stock-rojo">No Stock</p>'
        break;
    }
    return html
}

function printButtonAddCart(stock, id) {
    var html = ""
    switch (true) {
    case stock <= 0:
        html = ''
        break;
    case stock > 0:
        html = '<p class="btn-add" id="' + id + '"><i class="fa fa-shopping-cart"></i><a href="#" class="hidden-sm">Add to cart</a></p>'
        break;
    }
    return html
}

function createPresent(id, name, stock, price, image, button) {
    $(".presents").append('<div class="col-xs-12 col-sm-6 col-md-3"><div class="col-item"><div class="post-img-content"> <img src="' + image + '" class="img-responsive" alt="a" /> </div><div class="info"><div class="row"><div class="price col-md-6"><h5>' + name + '</h5><h5 class="price-text-color">' + price + ' Coins</h5> </div><div class="rating hidden-sm col-md-6">' + stock + '</div></div><div class="separator clear-left">' + button + '<p class="btn-details">Num Ref: ' + id + '</p></div><div class="clearfix"></div></div></div> </div>');
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