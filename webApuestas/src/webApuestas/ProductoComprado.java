package webApuestas;

public class ProductoComprado {

	int cantidad;
	int id;
	
	public ProductoComprado(int id,int cantidad){
		this.id = id;
		this.cantidad = cantidad;
	}
	
	
	public void setId(int id){
		this.id = id;
	}
	
	public int getId(){
		return this.id;
	}
	
	public void setCantidad(int cantidad){
		this.cantidad= cantidad;
	}
	
	public int getCantidad(){
		return this.cantidad;
	}
}
