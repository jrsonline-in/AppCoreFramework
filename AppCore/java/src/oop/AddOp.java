package oop;
import java.util.Arrays;

public class AddOp {
	int[] numbers;
	int result;

	 void displayResult() {
		if(result < 0){
			System.out.println("Can add " + Arrays.toString(numbers));
		} else {
			// print result
			System.out.println("Sum of " + Arrays.toString(numbers) + " is " + result);
		}
	}

	 void performOp() {
		int sum = numbers[0];
		for(int i=1; i<numbers.length; i++){
			sum = sum + numbers[i];
		}
		result = sum;
	}

	 void getNumbers(String[] inputs) {
		int[] nos = new int[inputs.length];
		for(int i=0; i<inputs.length; i++){
			nos[i] = Integer.parseInt(inputs[i]);
		}
		numbers = nos;
	}


}
