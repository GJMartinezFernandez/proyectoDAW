package webApuestas;

import java.io.IOException;
import java.util.ArrayList;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
 

@ServerEndpoint("/EchoServer") 
public class EchoServer {

	ArrayList<Session> sesiones = new ArrayList<Session>();
    @OnOpen
    public void onOpen(Session session){
        System.out.println(session.getId() + " has opened a connection"); 
        sesiones.add(session);
    }
 

    @OnMessage
    public void onMessage(String message, Session session){
        System.out.println("Message from " + session.getId() + ": " + message);
        try {
        	for(int i=0;i<sesiones.size();i++){
        		session.getBasicRemote().sendText(message);
        	}
            
            
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
 
   
    @OnClose
    public void onClose(Session session){
    	sesiones.remove(session);
    }
}