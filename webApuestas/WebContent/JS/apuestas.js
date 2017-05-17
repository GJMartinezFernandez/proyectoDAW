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
		
		//TODO Falta recuperar nombre del jugador y bloquear botones
		if(cantidad <= balance && cantidad>0){
			$.ajax({
	            url:   'services/server/apostar',
	            type:  'get',
	            success:  function (response) {
	                    if(response==1){
	                    	console.log('apostado con existo');
	                    	boton.prop("disabled", true);
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