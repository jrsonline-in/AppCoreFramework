
public class Table {

	public static void main(String[] args) {
		int a = 3;
		int[] multiples = new int[10];
		// find the nth multiple of a and store in nth cell where n is from 1 to 10
		//multiple[n-1] = a*n;
		multiples[0] = a*1;
		multiples[1] = a*2;
		multiples[2] = a*3;
		multiples[3] = a*4;
		multiples[4] = a*5;
		multiples[5] = a*6;
		multiples[6] = a*7;
		multiples[7] = a*8;
		multiples[8] = a*9;
		multiples[9] = a*10;
		
		System.out.println(a + " x 7 = " + multiples[6]);
		System.out.println(a + " x 10 = " + multiples[9]);
	}
}
