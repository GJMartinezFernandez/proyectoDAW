     function Jugador(id,nombre,cantidad){
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.color;
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
		var cantidad = $('#dineroApuesta').val();
		var balance = parseInt($('#balance').text());
		var jug = new Jugador(1,"nombre",cantidad,"rojo");
        var json = JSON.stringify(jug);
        console.log(json);
		//TODO Falta recuperar nombre del jugador y bloquear botones
		if(cantidad <= balance && cantidad>0){
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
			span.text(cantidad);
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
			//apuestas ganadass
			if(bool){
				$(apuesta).css("right","50px");
				$(apuesta).css("opacity","1")
				$(apuesta).css("color","green");
				//esta sera la cantidad que hemos ganado cuando el server la calcule y nos la devuelva
				apuesta.text("+" + parseInt(ganadores.cantidad));
				nuevoBalance = txtBalance + parseInt(ganadores.cantidad);
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
			apuesta.text("-" + parseInt(ganadores.cantidad));
			nuevoBalance = txtBalance - parseInt(ganadores.cantidad);
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



 