package webApuestas;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

import com.google.gson.Gson;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;



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
			actualizarBD();
		}else{
			numero-=1;;
		}
	}
	

	public static void actualizarBD(){
		
		numero=20;
	}
	
	public Connection getConnection() throws SQLException{
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
