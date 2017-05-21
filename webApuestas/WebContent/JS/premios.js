$(document).ready(function () {
    $.ajax({
        type: 'GET'
        , url: 'services/server/getpresents'
        , success: function (data) {
        	var json = JSON.parse(data)
            var contador = 0;
            while (contador < json.length){
                var id = json[contador].id	
                var name = json[contador].name
                var stock = json[contador].stock
                var price = json[contador].price
                var image = json[contador].image
                $("#presents").append('<div class="col-xs-12 col-sm-6 col-md-3"><div class="col-item"><div class="post-img-content"> <img src="'+image+'" class="img-responsive" alt="a" /> </div><div class="info"><div class="row"><div class="price col-md-6"><h5>'+name+'</h5><h5 class="price-text-color">'+price+'Coins</h5> </div><div class="rating hidden-sm col-md-6"><p class="stock">'+stock+'</p></div></div><div class="separator clear-left"><p class="btn-add" id="limpia"> <i class="fa fa-shopping-cart"></i><a href="http://www.google.es" class="hidden-sm">Añadir al Carrito</a></p></div><div class="clearfix"></div></div></div></div>');
                contador++
                }
        }
    });
});