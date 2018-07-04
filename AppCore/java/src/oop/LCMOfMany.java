package oop;
import java.util.Arrays;

public class LCMOfMany {

	int[] numbers;
	int result;

	 void displayResult() {
		if(result < 0){
			System.out.println("No common multiple found for " + Arrays.toString(numbers));
		} else {
			// print result
			System.out.println("LCM of " + Arrays.toString(numbers) + " is " + result);
		}
	}

	 void performOp() {
		int lcm = numbers[0];
		for(int i=1; i<numbers.length; i++){
			lcm = findLCM(lcm, numbers[i]);
		}
		result = lcm;
	}

	 void getNumbers(String[] inputs) {
		int[] nos = new int[inputs.length];
		for(int i=0; i<inputs.length; i++){
			nos[i] = Integer.parseInt(inputs[i]);
		}
		numbers = nos;
	}

	/*
	 *  1. find few multiples of 'a' and 'b'. Store them as 'mofa' and 'mofb' respectively.
	 *  2. fid the first common number in 'mofa' and 'mofb'. This is the LCM.
	 */
	 int findLCM(int a, int b) {
		// find multiples of 'a'
		int[] mofa = findMultiples(a, b);
		// find multiples of 'b'
		int[] mofb = findMultiples(b, a);
		
		// find first common in above multiples
		int lcm = findFirstCommon(mofa, mofb);
		return lcm;
	}

	// find 'nom' multiples of a number 'num' and return the multiples;
	 int[] findMultiples(int num, int nom){
		int[] multiplesOfNum = new int[nom];
		for(int i=1; i <= multiplesOfNum.length; i++){
			multiplesOfNum[i-1] = num*i;
		}
		return multiplesOfNum;
	}
	
	 int findFirstCommon(int[] firstList, int[] secondList){
		if(firstList.length < secondList.length){
			for(int findex=0; findex<firstList.length; findex++){
				int m = firstList[findex];
				
				for(int sindex=0; sindex< secondList.length; sindex++){
					int n = secondList[sindex];
					if(m == n){
						return m;
					} 
				}
			}
		} else {
			for(int findex=0; findex<secondList.length; findex++){
				int m = secondList[findex];
				
				for(int sindex=0; sindex< firstList.length; sindex++){
					int n = firstList[sindex];
					if(m == n){
						return m;
					} 
				}
			}
		}
		return -1; // negative indicates nothing common found.
	}

}
