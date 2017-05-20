package webApuestas;

public class Premio {

	private int id;
	private String name;
	private int price;
	private int stock;
	private String image;
	
	public Premio(int id, String name, int price, int stock, String image){
		this.id = id;
		this.name = name;
		this.price = price;
		this.stock = stock;
		this.image = image;
	}
	
	public void setId(int id){
		this.id = id;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public void setPrice(int price){
		this.price = price;
	}
	
	public void setStock(int stock){
		this.stock = stock;
	}
	
	public void setImage(String image){
		this.image = image;
	}
	
	public int getId(){
		return this.id;
	}
	
	public String getName(){
		return this.name;
	}
	
	public int getPrice(){
		return this.price;
	}
	
	public int getStock(){
		return this.stock;
	}
	
	public String getImage(){
		return this.image;
	}
	
}