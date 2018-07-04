package inheritance;

import java.util.Arrays;

abstract public class MathOperation {
	float[] numbers;
	float result;
	
	 void getNumbers(String[] inputs) {
		float[] nos = new float[inputs.length];
		for(int i=0; i<inputs.length; i++){
			nos[i] = Float.parseFloat(inputs[i]);
		}
		numbers = nos;
	}
	
	abstract void performOp();
	
	 void displayResult() {
		if(result < 0){
			System.out.println("No result found for " + Arrays.toString(numbers));
		} else {
			// print result
			System.out.println("Result of given Math operation on " + Arrays.toString(numbers) + " is " + result);
		}
	}
}
