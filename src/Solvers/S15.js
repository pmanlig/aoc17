//import React from 'react';
import Solver from './Solver';

class Generator {
	constructor(initial, multiplier, mask) {
		this.last = initial;
		this.mul = multiplier;
		this.mask = mask;
	}

	next() {
		this.last = (this.last * this.mul) % 2147483647;
		return this.last;
	}

	next2() {
		do { this.next(); } while ((this.last % this.mask) !== 0);
		return this.last;
	}
}

export class S15a extends Solver {
	solve(input) {
		// input = "Generator A starts with 65\nGenerator B starts with 8921";
		input = input.split('\n').map(s => s.match(/^Generator \w starts with (\d+)/));
		let a1 = new Generator(parseInt(input[0][1], 10), 16807, 4);
		let b1 = new Generator(parseInt(input[1][1], 10), 48271, 8);
		let a2 = new Generator(parseInt(input[0][1], 10), 16807, 4);
		let b2 = new Generator(parseInt(input[1][1], 10), 48271, 8);
		let matches = 0, matches2 = 0;
		let mask = (2 ** 16) - 1;
		for (let i = 0; i < 40000000; i++) {
			let num_a = a1.next();
			let num_b = b1.next();
			if ((num_a & mask) === (num_b & mask)) { matches++; }
			// if (i < 5) { console.log(`A: ${num_a}, B: ${num_b}`); }
		}
		for (let i = 0; i < 5000000; i++) {
			let num_a = a2.next2();
			let num_b = b2.next2();
			if ((num_a & mask) === (num_b & mask)) { matches2++; }
			// if (i < 5) { console.log(`A: ${num_a}, B: ${num_b}`); }
		}
		this.setState({ solution: `Matches(1): ${matches}\nMatches(2): ${matches2}` });
	}
}

export class S15b extends Solver {
}