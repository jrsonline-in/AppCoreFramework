import java.util.Arrays;

public class LCMOfMany {

	public static void main(String[] inputs) {
		
		if(inputs.length < 1){
			System.out.println("Please provide at least one number as program argument. Try again.");
			return;
		}
		//int[] nos = {2,5,8,5};
		
		// use program arguments, if available
		int[] nos = getNumbers(inputs);

		
		int lcm = performOp(nos);
		
		displayResult(nos, lcm);

	}

	static void displayResult(int[] nos, int lcm) {
		if(lcm < 0){
			System.out.println("No common multiple found for " + Arrays.toString(nos));
		} else {
			// print result
			System.out.println("LCM of " + Arrays.toString(nos) + " is " + lcm);
		}
	}

	static int performOp(int[] nos) {
		int lcm = nos[0];
		for(int i=1; i<nos.length; i++){
			lcm = findLCM(lcm, nos[i]);
		}
		return lcm;
	}

	static int[] getNumbers(String[] inputs) {
		int[] nos = new int[inputs.length];
		for(int i=0; i<inputs.length; i++){
			nos[i] = Integer.parseInt(inputs[i]);
		}
		return nos;
	}

	/*
	 *  1. find few multiples of 'a' and 'b'. Store them as 'mofa' and 'mofb' respectively.
	 *  2. fid the first common number in 'mofa' and 'mofb'. This is the LCM.
	 */
	static int findLCM(int a, int b) {
		// find multiples of 'a'
		int[] mofa = findMultiples(a, b);
		// find multiples of 'b'
		int[] mofb = findMultiples(b, a);
		
		// find first common in above multiples
		int lcm = findFirstCommon(mofa, mofb);
		return lcm;
	}

	// find 'nom' multiples of a number 'num' and return the multiples;
	static int[] findMultiples(int num, int nom){
		int[] multiplesOfNum = new int[nom];
		for(int i=1; i <= multiplesOfNum.length; i++){
			multiplesOfNum[i-1] = num*i;
		}
		return multiplesOfNum;
	}
	
	static int findFirstCommon(int[] firstList, int[] secondList){
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
