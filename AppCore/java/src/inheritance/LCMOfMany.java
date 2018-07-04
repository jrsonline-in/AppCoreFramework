package inheritance;
import java.util.Arrays;

public class LCMOfMany extends MathOperation{


	 void displayResult() {
		if(result < 0){
			System.out.println("No common multiple found for " + Arrays.toString(numbers));
		} else {
			// print result
			System.out.println("LCM of " + Arrays.toString(numbers) + " is " + result);
		}
	}

	 void performOp() {
		float lcm = numbers[0];
		for(int i=1; i<numbers.length; i++){
			lcm = findLCM(lcm, numbers[i]);
		}
		result = lcm;
	}


	/*
	 *  1. find few multiples of 'a' and 'b'. Store them as 'mofa' and 'mofb' respectively.
	 *  2. find the first common number in 'mofa' and 'mofb'. This is the LCM.
	 */
	 float findLCM(float a, float b) {
		// find multiples of 'a'
		float[] mofa = findMultiples(a, b);
		// find multiples of 'b'
		float[] mofb = findMultiples(b, a);
		
		// find first common in above multiples
		float lcm = findFirstCommon(mofa, mofb);
		return lcm;
	}

	// find 'nom' multiples of a number 'num' and return the multiples;
	 float[] findMultiples(float num, float nom){
		float[] multiplesOfNum = new float[(int)nom];
		for(int i=1; i <= multiplesOfNum.length; i++){
			multiplesOfNum[i-1] = num*i;
		}
		return multiplesOfNum;
	}
	
	 float findFirstCommon(float[] firstList, float[] secondList){
		if(firstList.length < secondList.length){
			for(int findex=0; findex<firstList.length; findex++){
				float m = firstList[findex];
				
				for(int sindex=0; sindex< secondList.length; sindex++){
					float n = secondList[sindex];
					if(m == n){
						return m;
					} 
				}
			}
		} else {
			for(int findex=0; findex<secondList.length; findex++){
				float m = secondList[findex];
				
				for(int sindex=0; sindex< firstList.length; sindex++){
					float n = firstList[sindex];
					if(m == n){
						return m;
					} 
				}
			}
		}
		return -1; // negative indicates nothing common found.
	}

}
