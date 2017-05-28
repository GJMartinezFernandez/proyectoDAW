var carrito = []
$(document).ready(function () {
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
        console.log(document.cookie)
        console.log(carrito)
    });
});

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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function createPresent(id, name, stock, price, image, button) {
    $(".presents").append('<div class="col-xs-12 col-sm-6 col-md-3"><div class="col-item"><div class="post-img-content"> <img src="' + image + '" class="img-responsive" alt="a" /> </div><div class="info"><div class="row"><div class="price col-md-6"><h5>' + name + '</h5><h5 class="price-text-color">' + price + ' Coins</h5> </div><div class="rating hidden-sm col-md-6">' + stock + '</div></div><div class="separator clear-left">' + button + '<p class="btn-details">Num Ref: ' + id + '</p></div><div class="clearfix"></div></div></div> </div>');
}