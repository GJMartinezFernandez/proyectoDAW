package webApuestas;

public class ProductoComprado {
	
	int cantidadComprada;
	int id;
	
	public ProductoComprado(int id,int cantidad){
		this.id = id;
		this.cantidadComprada = cantidad;
	}
	
	
	public void setId(int id){
		this.id = id;
	}
	
	public int getId(){
		return this.id;
	}
	
	public void setCantidadComprada(int cantidad){
		this.cantidadComprada = cantidad;
	}
	
	public int getCantidadComprada(){
		return this.cantidadComprada;
	}
}
