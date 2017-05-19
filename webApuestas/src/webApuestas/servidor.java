package webApuestas;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
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
import javax.websocket.server.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.mysql.jdbc.PreparedStatement;
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
	@Path("/apostar/{json}")
	public int apostar(HttpServletRequest request , @javax.ws.rs.PathParam("json") String json){
		//TODO Actualizar BD con la apuesta e introducir jugador dentro de una lista
		int respuesta = 1;

		
		System.out.println(json);
		return respuesta;
	}
	
	
	@GET
	@Path("/getpresents")
	public String getPresents(){
		
		return "{'name':'hola','stock':23,'price':100,'image':'hola.jgp'}";
	}
	
	public static void actualizarNumero(){
		if(numero==0){
			actualizarBD();
		}else{
			numero-=1;;
		}
	}
	

	public static void actualizarBD(){
		
		numero=20;
	}
	
	public Connection getConnection(){

		
		return null;
	}
	
	
	
}
