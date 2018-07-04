
public class Function {

	public static void main(String[] args) {
		int a = 2, b=3;
		int[] tofa = new int[20];
		tofa = findMultiples(a);
		
		//print multiples
		for(int i=0; i<20; i++){
			System.out.println(tofa[i]);
		}
		
		int[] tofb = findMultiples(b);
		
	}

	// find first 20 multiples of a number 'num' and return the multiples;
	static int[] findMultiples(int a){
		int[] multiplesOfNum = new int[20];
		for(int i=1; i<=20; i++){
			multiplesOfNum[i-1] = a*i;
		}
		return multiplesOfNum;
	}
}
