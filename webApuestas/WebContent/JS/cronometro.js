	var txtnumero;
	var cronometro = 50;
	$(document).ready(function(){
		txtnumero = $('#contador');
		pedirCronometro();	
        pedirNumerosAnteriores();
	});
	
	
	function pedirCronometro(){
		$.ajax({
            url:   'services/server/cronometro',
            type:  'get',
            success:  function (response) {
                    txtnumero.html(response);
                    cronometro = parseInt(txtnumero.text());
                    bajarCronometro();
            },
            error: function (){
                        console.log("error")
                    }
    });
	}
	

    function pedirNumerosAnteriores(){
        
        $.ajax({
            url:   'services/server/numerosAnteriores',
            type:  'get',
            success:  function (response) {
                   var numeros = JSON.parse(response);
                   var salida;
                   var spanNumeros = $('#numerosAnteriores');
                   for(var i = 0; i<numeros.length;i++){
                       salida+=numeros[i]+"</span> ";
                   }
                   spanNumeros.text(salida);
            },
            error: function (){
                        console.log("error")
                    }
    });
    }

    
	function bajarCronometro(){
		var idInterval = setInterval(function(){
			if(cronometro>0){
				cronometro-=1;
				txtnumero.text('' + cronometro);
			}else{
				pedirNumero();
                pedirNumerosAnteriores();
				clearInterval(idInterval);
				bloquearBotones();
			}
		},1000);
	}