$(document).ready(function () {
    console.log("Cookie: "+getCookie("carrito"))
    var arrayIds = getCookie("carrito").split(',')
    console.log("Array split:" + arrayIds)
    var json = [];
    
    for (i in arrayIds) {
        json[i] = arrayIds[i]
    }
    
    console.log(json)
    var jsonString = JSON.stringify(json)
    console.log("JSON Stringify: "+ JSON.stringify(json))
    $.ajax({
        type: 'GET'
        , url: 'services/server/getcarrito/' + jsonString
        , success: function (data) {
            var json = "[" + JSON.parse(data) + "]";
            console.log(data)
                /*for (i in json) {
                    var id = json[i].id
                    var name = json[i].name
                    var stock = json[i].stock
                    var price = json[i].price
                    var image = json[i].image
                    stock = comprobarStock(stock)
                    createPresent(id, name, stock, price, image, button)
                }*/
        }
    });
    //createTr()
})

function createTr() {
    $('#addRow').prepend('<tr> <td class="col-sm-8 col-md-6"><div class="media"> <a class ="thumbnail pull-left" href="#"> <img class="media-object" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" style="width: 72px; height: 72px;"></a><div class="media-body"><h4 class="media-heading"> <a href="#">Product name</a></h4><h5 class="media-heading">Ref: ' + id + '</h5><span> Status: </span><span class="text-success"><strong>In Stock</strong></span></div></div></td><td class="col-sm-1 col-md-1" style="text-align: center"><input type="email" class="form-control" id="exampleInputEmail1" value="3"></td><td class="col-sm-1 col-md-1 text-center"><strong>$4.87</strong></td><td class="col-sm-1 col-md-1 text-center"><strong>$14.61</strong></td><td class="col-sm-1 col-md-1"><button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Remove </button></td></tr>');
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