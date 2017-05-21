package webApuestas;

public class Apuesta {

	 private int id;
     private int coins;
     private String color;
     
     
     public Apuesta(int id, int coins, String color){
    	 this.id = id;
    	 this.coins = coins;
    	 this.color = color;
     }
     
     public void setId(int id){
    	 this.id = id;
     }
     
     
     public void setCoins(int coins){
    	 this.coins = coins;
     }
     
     public void setColor(String color){
    	 this.color = color;
     }
     
     public int getId(){
    	 return this.id;
     }
     
     public int getCoins(){
    	 return this.coins;
     }
     
     public String getColor(){
    	 return this.color.toString();
     }
     
}
