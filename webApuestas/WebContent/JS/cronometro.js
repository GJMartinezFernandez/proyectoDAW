	var txtnumero;
	var cronometro = 50;
	$(document).ready(function(){
		txtnumero = $('#contador');
		pedirCronometro();	
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
	
	function bajarCronometro(){
		var idInterval = setInterval(function(){
			if(cronometro>0){
				cronometro-=1;
				txtnumero.text('' + cronometro);
			}else{
				pedirNumero();
				clearInterval(idInterval);
				bloquearBotones();
			}
		},1000);
	}