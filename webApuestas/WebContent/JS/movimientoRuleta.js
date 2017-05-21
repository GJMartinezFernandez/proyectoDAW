var numeros = [1,14,2,13,3,12,4,0,11,5,10,6,9,7,8];
var tamano = 2348;
var vueltas = 2;
var casilla = tamano/30;
var posIni = 0;
var ganador = false;
var colorGanador;
var apuestaGanadora;
var multiplicador;
    function pedirNumero(){
    	$.ajax({
            url:   'services/server/numeroGanador',
            type:  'get',
            success:  function (response) {
                            if(response==0){
                                colorGanador = "verde";
                                multiplicador = 14;
                            }else if(response<=7){
                                colorGanador = "rojo";
                                multiplicador = 2;
                            }else{
                                colorGanador = "negro";
                                multiplicador = 2;
                            }
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
  		}, 2000, 'swing', ganar);
        var cadena = $('.ruleta').css("background-position-x");
    	posIni = movimiento;
        
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
        console.log("ganar");
        console.log(listaApuestas);
        
        for(var i=0;i<listaApuestas.length;i++){
            if(listaApuestas[i].color == colorGanador){
                apuestaGanadora = listaApuestas[i];
                apuestaGanadora.coins*=multiplicador;
                ganador = true;
                break;
            }
        }
        
        if(ganador){
            var json = JSON.stringify(apuestaGanadora);
            console.log(json)
            pintar(json,true);
        }
        
    	pedirCronometro();
		activarBotones();
        ganar = false;
        setTimeout(reset,3000);
    }