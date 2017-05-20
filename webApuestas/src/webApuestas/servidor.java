package webApuestas;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Random;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

import com.google.gson.Gson;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;



@Path("/server")
public class servidor extends HttpServlet{
	
	static ArrayList<Jugador> apuestas = new ArrayList<Jugador>();
	static  final int MAX_TIME = 20;
	static int numero=MAX_TIME;
	static int numeroGanador;
	
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
		Gson gson = new Gson();
		Jugador jugador = gson.fromJson(json, Jugador.class);
		
		try {
			Connection conexion = getConnection();
			Statement s = (Statement) conexion.createStatement(); 
			s.executeUpdate("UPDATE usuarios SET cantidad = cantidad - " + jugador.getCantidad() + " WHERE id = " + jugador.getId());
			apuestas.add(jugador);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return respuesta;
	}
	
	@GET
	@Path("/numeroGanador")
	public int numeroGanador(){
		 return numeroGanador;
	}
	
	@GET
	@Path("/getpresents")
	public String getPresents(){
		
		Gson gson = new Gson();
		Premio premio = null;
		ArrayList<Premio> premios = new ArrayList<Premio>();
		String salida;
		try {
			Connection conexion = getConnection();
			Statement s = (Statement) conexion.createStatement(); 
			ResultSet rs = s.executeQuery ("select * from premios");
			while (rs.next()) 
			{ 
			    premio = new Premio(rs.getInt(1),rs.getString(2),rs.getInt(3),rs.getInt(4),rs.getString(5));
			    premios.add(premio);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		salida = gson.toJson(premios);
		return salida;
	}
	
	public static void actualizarNumero(){
		if(numero==0){
			Random r = new Random();
			numeroGanador = r.nextInt(15);
			actualizarBD();
		}else{
			numero-=1;;
		}
	}
	

	
	public static void actualizarBD(){
		String colorGanador="";
		int multiplicador = 2;
		
		if(numeroGanador==0){
			colorGanador = "verde";
			multiplicador = 14;
		}else{
			switch(numeroGanador%2){
			case 0: 
					colorGanador = "negro";
					break;
			case 1:
					colorGanador = "rojo";
					break;
			}
		}

		for(int i=0;i<apuestas.size();i++){
			Jugador jugador = apuestas.get(i);
			if(jugador.getColor().equals(colorGanador)){
				//TODO Falta enviar a cada ganador el mensaje de que ha ganado.
				try {
					Connection conexion = getConnection();
					Statement s = (Statement) conexion.createStatement(); 
					s.executeUpdate("UPDATE usuarios set balance = balance + " + jugador.getCantidad()*multiplicador + " WHERE id = " + jugador.getId());
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		numero=MAX_TIME;
	}
	
	public static Connection getConnection() throws SQLException{
		Connection con = null;
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			
			
			String sURL = "jdbc:mysql://localhost:3306/web_apuestas";
			con = (Connection) DriverManager.getConnection(sURL,"root","");
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return con;
	}
	
	
	
}
