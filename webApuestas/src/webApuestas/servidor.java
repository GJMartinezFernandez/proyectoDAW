package webApuestas;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.inject.Singleton;
import javax.jws.WebService;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebListener;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

import com.sun.corba.se.pept.transport.Connection;

@Path("/server")
public class servidor extends HttpServlet{
	
	static int numero=20;
	
	@GET
	@Path("/cronometro")
	public int getNumero(){
		return numero;
	}
	
	@GET
	@Path("/apostar")
	public int apostar(HttpServletRequest request){
		//TODO Actualizar BD con la apuesta e introducir jugador dentro de una lista
		int respuesta = 1;
		
		return respuesta;
	}
	
	public static void actualizarNumero(){
		if(numero==0){
			actualizarBD();
		}else{
			numero-=1;
		}
	}
	

	public static void actualizarBD(){
		numero=20;
	}
	
	
}
