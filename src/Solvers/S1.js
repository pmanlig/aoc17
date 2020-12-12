import Solver from './Solver';

export class S1a extends Solver {
	solve(input) {
		let sum = 0, sum2 = 0;
		input = input.split('').map(c => parseInt(c, 10));
		for (let i = 0; i < input.length; i++) {
			if (input[i] === input[(i + 1) % input.length]) sum += input[i];
			if (input[i] === input[(i + input.length / 2) % input.length]) sum2 += input[i];
		}
		this.setState({ solution: `Length: ${input.length}\nSum is: ${sum}\nSum 2 is: ${sum2}` });
	}
}

export class S1b extends Solver {
}