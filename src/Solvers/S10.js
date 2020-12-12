//import React from 'react';
import Solver from './Solver';

const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

class HashString {
	constructor(n) {
		this.position = 0;
		this.skip = 0;
		this.numbers = [];
		for (let i = 0; i < n; i++) { this.numbers.push(i); }
	}

	knot(n) {
		let rev = [];
		for (let i = n - 1; i >= 0; i--) {
			rev.push(this.numbers[(this.position + i) % this.numbers.length]);
		}
		for (let i = 0; i < n; i++) {
			this.numbers[(this.position + i) % this.numbers.length] = rev[i];
		}
		this.position = (this.position + n + this.skip++) % this.numbers.length;
	}
}

export class S10a extends Solver {
	solve(input) {
		let test = new HashString(5);
		test.knot(3);
		console.log(test);
		let s1 = new HashString(256);
		input.split(',').map(n => parseInt(n, 10)).forEach(n => s1.knot(n));
		let s2 = new HashString(256);
		let seq = input.split('').map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
		for (let i = 0; i < 64; i++) {
			seq.forEach(n => s2.knot(n));
		}
		let hash = [];
		for (let i = 0; i < 16; i++) {
			let acc = 0;
			for (let j = 0; j < 16; j++) {
				acc = acc ^ s2.numbers[i * 16 + j];
			}
			hash.push(acc);
		}
		let hashStr = hash.map(n => hex[n >>> 4] + hex[n & 15]).join('');
		this.setState({ solution: `Checksum: ${s1.numbers[0] * s1.numbers[1]}\nHash: ${hashStr}` });
	}
}

export class S10b extends Solver {
}