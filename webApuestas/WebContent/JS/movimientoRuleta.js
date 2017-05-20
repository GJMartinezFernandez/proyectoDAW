var numeros = [1,14,2,13,3,12,4,0,11,5,10,6,9,7,8];
var tamano = 2348;
var vueltas = 2;
var casilla = tamano/30;
var posIni = 0;

    function pedirNumero(){
    	$.ajax({
            url:   'services/server/numeroGanador',
            type:  'get',
            success:  function (response) {
                        	mover(response);
                            numeroAnt = response;
            },
            error: function (){
                        console.log("error")
                    }
    });

    }

    function mover(numero){
    	var centro = $('.ruleta').width()/2;
        var casillaPos= Math.floor(Math.random() * (76 - 2)) + 0;
        var numeroCasillas = buscarPosicion(numero)*casilla;
    	var movimiento =  (tamano*vueltas)+numeroCasillas-centro-casillaPos;
    	$('.ruleta').animate({
  		  'background-position-x': '-='+ movimiento +'px'
  		}, 2000, 'swing',ganar);
        var cadena = $('.ruleta').css("background-position-x");
    	posIni = movimiento;
        setTimeout(reset,3000);
        //console.log(posIni);
    	}

    function buscarPosicion(numero){
    	var pos;
    	var encontrado = false;
    	for(var i=0;i<numeros.length;i++){
    		if(numero==numeros[i]){
    			pos=i+1;
    			break;
    		}
    	}
         
    	return pos;
    
    }

    function reset(){
        $('.ruleta').animate({
  		  'background-position-x': '+='+ posIni +'px'
  		}, 1000, 'swing');
    }
    
    function  ganar(){
    	pedirCronometro();
		activarBotones();
    }