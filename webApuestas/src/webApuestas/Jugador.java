package webApuestas;

public class Jugador {

	 private int id;
     private String nombre;
     private int cantidad;
     private String color;
     
     
     public Jugador(int id, String nombre, int cantidad, String color){
    	 this.id = id;
    	 this.nombre = nombre;
    	 this.cantidad = cantidad;
    	 this.color = color;
     }
     
     public void setId(int id){
    	 this.id = id;
     }
     
     public void setNombre(String nombre){
    	 this.nombre = nombre;
     }
     
     public void setCantidad(int cantidad){
    	 this.cantidad = cantidad;
     }
     
     public void setColor(String color){
    	 this.color = color;
     }
     
     public int getId(){
    	 return this.id;
     }
     
     public String getNombre(){
    	 return this.nombre;
     }
     
     public int getCantidad(){
    	 return this.cantidad;
     }
     
     public String getColor(){
    	 return this.color;
     }
     
}
