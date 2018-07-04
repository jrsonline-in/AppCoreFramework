
public class BeforeMain {

	String attr = "";
	
	void print(){
		System.out.println(this.attr);
	}

	static {
		BeforeMain w1 = new BeforeMain();
		w1.attr = "A1 W1";
		w1.print();
		
		BeforeMain w2 = new BeforeMain();
		w2.attr = "A2 W2";
		w2.print();
	}
	
	
	public static void main(String[] args) {
		System.out.println("Main Method");
	}
}
