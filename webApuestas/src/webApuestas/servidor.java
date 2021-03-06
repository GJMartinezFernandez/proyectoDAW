package webApuestas;

import java.lang.reflect.Type;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.Random;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.reflect.TypeToken;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;



@Path("/server")
public class servidor extends HttpServlet{
	
	static ArrayList<Integer> listaNumerosAnteriores = new ArrayList<Integer>();
	static ArrayList<Apuesta> apuestas = new ArrayList<Apuesta>();
	static  final int MAX_TIME = 20;
	static int numero=MAX_TIME;
	static int numeroGanador;
	final int COINS_INICIO = 4000;
	
	
	@GET
	@Path("/apuestasRealizadas/{json}")
	public String coinsGratis(@PathParam("json") String json){
		String salida = "NO OK";
		Gson gson = new Gson();
		Properties properties = gson.fromJson(json, Properties.class);
		try {
			Connection conexion = getConnection();
			Statement s = (Statement) conexion.createStatement(); 
			s.executeUpdate("UPDATE usuarios SET coins = 2000  WHERE id = " + properties.getProperty("id"));
			salida = "OK";
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		return salida;
	}
	
	@GET
	@Path("/cronometro")
	public int getNumero(){

		return numero;
	}
	
	@GET
	@Path("/apuestasRealizadas")
	public String getApuestasRealizadas(){
		String json = "[";
		if(EchoServer.apuestasRealizadas.size() > 0){
			json+=EchoServer.apuestasRealizadas.get(0);
		}
		
		for(int i = 1;i < EchoServer.apuestasRealizadas.size();i++){
			json+=","+EchoServer.apuestasRealizadas.get(i);
		}
		json +="]"; 
		return json;
	}
	
	@GET
	@Path("/numerosAnteriores")
	public String getNumerosAnteriores(){
		Gson gson = new Gson();
		String json = gson.toJson(listaNumerosAnteriores);
		return json;
	}
	
	@GET
	@Path("/apostar/{json}")
	public int apostar(HttpServletRequest request , @PathParam("json") String json){


		int respuesta = 1;
		Gson gson = new Gson();
		Type type = new TypeToken<Apuesta>(){}.getType();
		Apuesta jugador = gson.fromJson(json, type);

		try {
			Connection conexion = getConnection();
			Statement s = (Statement) conexion.createStatement(); 
			s.executeUpdate("UPDATE usuarios SET coins = coins - " + jugador.getCoins() + " WHERE id = " + jugador.getId());
			apuestas.add(jugador);
		} catch (SQLException e) {
			
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
			
			e.printStackTrace();
		}
		
		salida = gson.toJson(premios);
		return salida;
	}
	
	@GET
	@Path("/getcarrito/{json}")
	public String getCarrito( @PathParam("json") String json){
		String salida = "";
		Gson gson = new Gson();	
		Premio premio = null;
		ArrayList<Premio> premios = new ArrayList<Premio>();
		TypeToken<List<ProductoComprado>> token = new TypeToken<List<ProductoComprado>>() {};
		List<ProductoComprado> ids = new Gson().fromJson(json, token.getType());
		String condicion="";
		if(ids.size()>0){
			condicion += ids.get(0).getId();
			for(int i = 1;i<ids.size();i++){
				condicion+=","+ids.get(i).getId();;
			}
		}
		
		try {
			Connection conexion = getConnection();
			Statement s = (Statement) conexion.createStatement(); 
			ResultSet rs = s.executeQuery ("select * from premios WHERE id IN (" + condicion + ");");
			while (rs.next()) 
			{ 
			    premio = new Premio(rs.getInt(1),rs.getString(2),rs.getInt(3),rs.getInt(4),rs.getString(5));
			    for(int j=0;j<ids.size();j++){
			    	if(ids.get(j).getId() == premio.getId()){
			    		premio.setCantidadComprada(ids.get(j).cantidad);
			    	}
			    }
			    premios.add(premio);
			}
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		
		salida = gson.toJson(premios);
		return salida;
	}
	
	@GET 
	@Path("/login/{json}")
	public String login( HttpServletRequest request, @PathParam("json") String json){

		Gson gson = new Gson();
		Properties properties = gson.fromJson(json, Properties.class);
		Jugador jugador =  new Jugador(null,properties.getProperty("email"),properties.getProperty("password"));
		String result="";
		Jugador j1 = null;
		try {
			Connection conexion = getConnection();
			Statement s = (Statement) conexion.createStatement(); 
			ResultSet rs = s.executeQuery ("select * from usuarios where email='"+jugador.email+"' and pass = '"+jugador.pass+"'");
			if(!rs.next()){ 
			    System.out.println("no hay filas");  
			    result = "Fail";
			    //devolver algo para saber que no coinciden
			}
			else{
			    do{
			    	//devuelve el id, nombre y coins 
			    	 j1= new Jugador(rs.getInt(1),rs.getString(2),rs.getInt(5));			    	 
			    } 
			    while(rs.next());
			    result = gson.toJson(j1);
			}
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		
		return result;
	}

	@GET 
	@Path("/register/{json}")
	public String register( @PathParam("json") String json){
		

		Gson gson = new Gson();
		Properties properties = gson.fromJson(json, Properties.class);
		Jugador jugador =  new Jugador(properties.getProperty("username"),properties.getProperty("email"),properties.getProperty("password"));
		String result="";
		
		try {
			Connection conexion = getConnection();
			Statement s = (Statement) conexion.createStatement(); 
			ResultSet rs = s.executeQuery("select * from usuarios where email='"+jugador.email+"'");
			
			if(!rs.next()){ 
				int id = conseguirUltimaId()+1;
			    s.executeUpdate("INSERT INTO usuarios(id, user, email, pass, coins) VALUES ('"+id+"','"+jugador.name+"','"+jugador.email+"', '"+jugador.pass+"','"+COINS_INICIO+"')");
			    jugador.setCoins(COINS_INICIO);
			    jugador.setId(id);    
			}
			else{
			    System.out.println("El usuario ya existe");
			}
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		
		result = gson.toJson(jugador);
		return result;
	}
	
	@GET
	@Path("comprar/{json}")
	public String comprar(@PathParam("json") String json){
		Gson gson = new Gson();

		Type type = new TypeToken<List<Premio>>(){}.getType();
	    List<Premio> premios = new Gson().fromJson(json, type);
	    int cod;
	    String result="OK";
	    
	    for (int i=0;i<premios.size();i++) {
	        Premio articulo = premios.get(i);
	        try {
				Connection conexion = getConnection();
				Statement s = (Statement) conexion.createStatement(); 
				cod = s.executeUpdate("UPDATE premios SET stock = stock - " + articulo.getStock() + " WHERE id = " + articulo.getId() + ";");
				if(cod==0){
					result = "Fail";
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
	      }
		
		return result;
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
			Apuesta jugador = apuestas.get(i);
			if(jugador.getColor().equals(colorGanador)){

				try {
					Connection conexion = getConnection();
					Statement s = (Statement) conexion.createStatement(); 
					s.executeUpdate("UPDATE usuarios set coins = coins + " + jugador.getCoins()*multiplicador + " WHERE id = " + jugador.getId());
				} catch (SQLException e) {	
					e.printStackTrace();
				}
			}
		}
		
		apuestas.clear();
		numero=MAX_TIME;
	}
	
	public static Connection getConnection() throws SQLException{
		Connection con = null;
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			String sURL = "jdbc:mysql://localhost:3306/web_apuestas";
			con = (Connection) DriverManager.getConnection(sURL,"root","");
		} catch (InstantiationException e) {
			
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			
			e.printStackTrace();
		}
		
		return con;
	}
	
	public static void actualizarNumero(){
		if(numero==0){
			Random r = new Random();
			numeroGanador = r.nextInt(15);
			listaNumerosAnteriores.add(numeroGanador);
			if(listaNumerosAnteriores.size() > 8){
				listaNumerosAnteriores.remove(0);
			}
			EchoServer.apuestasRealizadas.clear();
			actualizarBD();
		}else{
			numero-=1;;
		}
	}
	
	public int  conseguirUltimaId(){
		int id = 1;
		try {
			Connection conexion = getConnection();
			Statement s = (Statement) conexion.createStatement(); 
			ResultSet rs = s.executeQuery("SELECT id FROM usuarios ORDER BY 1 DESC ");
			
			if(rs.next()){ 
				id = rs.getInt("id");
			}
			
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		
		return id;
	}
}
