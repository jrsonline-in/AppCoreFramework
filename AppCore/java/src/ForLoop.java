
public class ForLoop {

	public static void main(String[] args) {
		//print the table of a number with multiple from 1 to 10
		int a = 2;
		/*
		int n= 1;
		if(n <=10){
			System.out.println(a*n);
		}		
		n++;
		if(n <=10){
			System.out.println(a*n);
		}		
		n++;
		if(n <=10){
			System.out.println(a*n);
		}		
		n++;
		if(n <=10){
			System.out.println(a*n);
		}		
		n++;
		if(n <=10){
			System.out.println(a*n);
		}		
		n++;
		if(n <=10){
			System.out.println(a*n);
		}		
		n++;
		if(n <=10){
			System.out.println(a*n);
		}		
		n++;
		if(n <=10){
			System.out.println(a*n);
		}		
		n++;
		if(n <=10){
			System.out.println(a*n);
		}		
		n++;
		*/
		
		for(int n=2; n<=10; n = n+2){
			if(n < 5){
				continue;
			}
			System.out.println(a + " x " + n + " = " + a*n);
			if(n == 5){
				break;
				
			}
		}
		
	}

}
