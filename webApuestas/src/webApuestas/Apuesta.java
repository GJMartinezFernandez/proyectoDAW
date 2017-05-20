package webApuestas;

public class Apuesta {

	 private int id;
     private int cantidad;
     private String color;
     
     
     public Apuesta(int id, int cantidad, String color){
    	 this.id = id;
    	 this.cantidad = cantidad;
    	 this.color = color;
     }
     
     public void setId(int id){
    	 this.id = id;
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
     
     public int getCantidad(){
    	 return this.cantidad;
     }
     
     public String getColor(){
    	 return this.color;
     }
     
}
