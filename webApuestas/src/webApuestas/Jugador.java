package webApuestas;

public class Jugador {
	int id;
	String name;
	String email;
	String pass;
	int coins;
	
	public Jugador(int id, String name,String email,String pass,int coins){
		this.id = id;
		this.name = name;
		this.email = email;
		this.pass=pass;
		this.coins=coins;
	}
	
	public Jugador(int id, String name, int coins){
		this.id = id;
		this.name = name;	
		this.coins=coins;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public int getCoins() {
		return coins;
	}

	public void setCoins(int coins) {
		this.coins = coins;
	}
	
	
	
}
