var listaApuestas = [];
function Apuesta(id,coins,color){
        this.id = id;
        this.coins = coins;
        this.color = color;
    }

$(document).ready(function(){
		
	var boton = $('.span4 > button');
	for(var i=0;i<boton.length;i++){
		boton[i].addEventListener('click',apostar);
	}
	});
	
  
	
	function apostar(){
		var boton = $(this);
		var p = boton.next();
		var span = $('<span></span><br>');
		var coins = $('#dineroApuesta').val();
		var balance = parseInt($('#balance').text());
		var jug = new Apuesta(1,coins,colorApostado($(this).attr("id")));
        listaApuestas[listaApuestas.length] = jug;
        console.log(listaApuestas);
        var json = JSON.stringify(jug);
        console.log(json);
		//TODO Falta recuperar nombre del jugador y bloquear botones
		if(coins <= balance && coins>0){
			$.ajax({
	            url:   'services/server/apostar/' + json,
	            type:  'get',
                dataType: "json",
	            success:  function (response) {
	                    if(response==1){
	                    	console.log('apostado con existo');
                            
	                    	boton.prop("disabled", true);
	                    	pintar(json,false);
	                    }
	            },
	            error: function (){
	                        console.log("error")
	                    }
	    });
			span.text(coins);
			p.append(span);
		}
	}
	
	function activarBotones(){
		var botonR = $('.btnRojo');
		var botonV = $('.btnVerde');
		var botonN = $('.btnNegro');
		botonR.prop("disabled",false);
		botonV.prop("disabled",false);
		botonN.prop("disabled",false);
	}
	
	function bloquearBotones(){
		var botonR = $('.btnRojo');
		var botonV = $('.btnVerde');
		var botonN = $('.btnNegro');
		botonR.prop("disabled",true);
		botonV.prop("disabled",true);
		botonN.prop("disabled",true);
	}
	
	function pintar(json, bool){
		var balance = $('#balance');
		var apuesta = $('#apuesta');
		var txtBalance = parseInt(balance.text());
		var nuevoBalance = "";
		var ganadores = JSON.parse(json);
        console.log(ganadores);
			//apuestas ganadass
			if(bool){
				$(apuesta).css("right","50px");
				$(apuesta).css("opacity","1")
				$(apuesta).css("color","green");
				//esta sera la cantidad que hemos ganado cuando el server la calcule y nos la devuelva
				apuesta.text("+" + parseInt(ganadores.coins));
				nuevoBalance = txtBalance + parseInt(ganadores.coins);
				$(balance).fadeTo(350,0, function() {
					$(this).text(nuevoBalance).fadeTo(350,1);
				});
				$(apuesta).fadeTo(1500,0).animate({
					'right': '130px'
				}, {duration: 1500, queue: false}, function() {
					//Animacion completada.a
				}
			);
			//apuestas perdidas
		}else{
			$(apuesta).css("right","50px");
			$(apuesta).css("opacity","1")
			$(apuesta).css("color","red");
			//esta sera la cantidad que perdemos de lo apostado se obtiene del objeto antes de enviarlo
			apuesta.text("-" + parseInt(ganadores.coins));
			nuevoBalance = txtBalance - parseInt(ganadores.coins);
			$(balance).fadeTo(350,0, function() {
				$(this).text(nuevoBalance).fadeTo(350,1);
			});
			$(apuesta).fadeTo(1500,0).animate({
				'right': '130px'
			}, {duration: 1500, queue: false}, function() {
				//Animacion completada.
			}
		);
}
}

function colorApostado(id){
    var color;
    switch(id){
        case "btnRojo": color ="rojo";
                        break;
        case "btnVerde": color = "verde";
                        break;
        case "btnNegro": color = "negro";
                        break;
    }
    return color;
}

 