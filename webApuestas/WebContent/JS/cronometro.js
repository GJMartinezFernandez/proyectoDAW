	var txtnumero;
	var cronometro = 50;
	$(document).ready(function () {
	    txtnumero = $('#contador');
	    pedirCronometro();
	    pedirNumerosAnteriores();
	});

	function pedirCronometro() {
	    $.ajax({
	        url: 'services/server/cronometro'
	        , type: 'get'
	        , success: function (response) {
	            txtnumero.html(response);
	            cronometro = parseInt(txtnumero.text());
	            bajarCronometro();
	        }
	        , error: function () {
	            console.log("error")
	        }
	    });
	}

	function pedirNumerosAnteriores() {
	    $.ajax({
	        url: 'services/server/numerosAnteriores'
	        , type: 'get'
	        , success: function (response) {
	            var numeros = JSON.parse(response);
	            console.log(numeros)
	            var salida = "";
	            var spanNumeros = $('#numerosAnteriores');
                var color;
	            spanNumeros.empty()
	            for (var i = 0; i < numeros.length; i++) {
                    if(numeros[i]== 0){
                        color = "numeroVerde";
                    }else if(numeros[i]<8){
                        color = "numeroRojo";
                    }else{
                        color = "numeroNegro";
                    }
	                spanNumeros.append('<span class="circulo ' + color + '">' + numeros[i] + '</span>');
	            }
	            //spanNumeros.text(salida);
	        }
	        , error: function () {
	            console.log("error")
	        }
	    });
	}

	function bajarCronometro() {
	    var idInterval = setInterval(function () {
	        if (cronometro > 0) {
	            cronometro -= 1;
	            txtnumero.text('' + cronometro);
	        }
	        else {
	            pedirNumero();
	            pedirNumerosAnteriores();
	            clearInterval(idInterval);
	            bloquearBotones();
	        }
	    }, 1000);
	}