package webApuestas;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class StartupListener implements ServletContextListener {

	static ScheduledExecutorService timer;
    @Override
    public void contextInitialized(ServletContextEvent event) {
    	 Thread thread = new Thread(tarea);
    	 thread.setDaemon(true);
    	 timer = Executors.newSingleThreadScheduledExecutor();
		 timer.scheduleAtFixedRate(tarea, 1, 1, TimeUnit.SECONDS);
		 System.out.println("funciono");
    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {
        // Perform action during application's shutdown
    }
    
    final static Runnable tarea = new Runnable() {
  	  public void run() {
  	    servidor.actualizarNumero();
  	  }
  	};
}
