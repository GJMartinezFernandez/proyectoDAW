package webApuestas;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/server")
public class servidor extends HttpServlet{

	int numero=20;
	ScheduledExecutorService timer;
	
	@GET
	@Path("/cronometro")
	public int getNumero(){
		return numero;
	}
	
	
	
	@Override
	    public void init(ServletConfig config) throws ServletException{
		 timer = Executors.newSingleThreadScheduledExecutor();
		 timer.scheduleAtFixedRate(tarea, 1, 1, TimeUnit.SECONDS);
	    }

	 @Override
	 public void destroy(){
		 timer.shutdown();
	 }


	public  void actualizarNumero(){
		if(numero==0){
			actualizarBD();
		}else{
			numero-=1;
		}
	}
	

	public void actualizarBD(){
		numero=20;
	}
	

	final Runnable tarea = new Runnable() {
	  public void run() {
	    actualizarNumero();
	  }
	};

}
