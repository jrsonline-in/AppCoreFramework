import java.util.Scanner;

public class PrintSeries {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.print("Input 'a': ");
		int a = sc.nextInt();
		System.out.print("Input 'n': ");
		int n = sc.nextInt();
		
		// nth number = (a pow n)/n
		double sum = 0;
		for(int i=1; i<=n; i++){
			//sum += Math.pow(a, i)/i;
			
			/*
			int f=1;
			for(int j =1; j<=i; j++){
				f *=j;
			}
			sum += a/f;
			*/
			
			sum += a/(Math.pow(2, i));
		}
		
		System.out.println("Value of series : " + sum);
	}

}
