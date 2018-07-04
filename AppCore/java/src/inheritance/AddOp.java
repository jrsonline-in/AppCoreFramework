package inheritance;

public class AddOp extends MathOperation{

	/*
	 void displayResult() {
		if(result < 0){
			System.out.println("Can add " + Arrays.toString(numbers));
		} else {
			// print result
			System.out.println("Sum of " + Arrays.toString(numbers) + " is " + result);
		}
	}
	*/

	 void performOp() {
		float sum = numbers[0];
		for(int i=1; i<numbers.length; i++){
			sum = sum + numbers[i];
		}
		result = sum;
	}

}
