//import React from 'react';
import Solver from './Solver';

export class S5a extends Solver {
	solve(input) {
		let mem = input.split('\n').map(n => parseInt(n, 10));
		let ip = 0, steps1 = 0, steps2 = 0;
		while (ip < mem.length) {
			steps1++;
			ip += mem[ip]++;
		}
		mem = input.split('\n').map(n => parseInt(n, 10));
		ip = 0;
		let offset = 0;
		while (ip < mem.length) {
			steps2++;
			offset = mem[ip];
			mem[ip] += offset > 2 ? -1 : 1;
			ip += offset;
		}
		this.setState({ solution: `Steps(1): ${steps1}\nSteps(2): ${steps2}` });
	}
}

export class S5b extends Solver {
}