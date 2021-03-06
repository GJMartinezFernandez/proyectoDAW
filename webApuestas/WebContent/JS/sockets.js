var webSocket;
var ipServer = "192.168.1.20";
var puertoServer = "8080";

function apuestaRecibida(nombre,coins,color){
    this.nombre = nombre;
    this.coins = coins;
    this.color = color;
}
   

$(document).ready(function(){
		openSocket();
	});

function openSocket(){
                
    if(webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED){
        writeResponse("WebSocket is already opened.");
        return;
    }
            
     webSocket = new WebSocket("ws://"+ipServer+":"+puertoServer+"/webApuestas/EchoServer");
                 

     webSocket.onopen = function(event){
                  
        if(event.data === undefined){
             return;
        }

        writeResponse(event.data);
     };
 
     webSocket.onmessage = function(event){  
            var apuestaNueva = JSON.parse(event.data);
            var p;
            switch(apuestaNueva.color){
                case 'rojo' : p = $('#btnRojo').next();
                              break;
                case 'verde' :p = $('#btnVerde').next();
                              break;
                case 'negro' :p = $('#btnNegro').next();
                              break;
            }
         
			p.append('<span class="apuestasNombre">' + apuestaNueva.nombre + '</span><span class="apuestasCantidad">' + apuestaNueva.coins + '</span><br>');
     };
 
     webSocket.onclose = function(event){
        writeResponse(event);
     };
}
           
        
function send(json){
    
    webSocket.send(json);
}
           
function closeSocket(){
    webSocket.close();
 }
 
function writeResponse(text){
    console.log(text);
}