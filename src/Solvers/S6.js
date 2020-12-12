//import React from 'react';
import Solver from './Solver';

export class S6a extends Solver {
	redist(m) {
		let n = [].concat(m);
		let x = Math.max(...n);
		let i = 0;
		while (n[i] !== x) { i++; }
		n[i++] = 0;
		while (x-- > 0) { n[i++ % n.length]++; }
		return n;
	}

	loop(mem) {
		let last = mem[mem.length - 1];
		for (let i = 0; i < mem.length - 1; i++) {
			let match = true;
			for (let j = 0; j < mem[i].length; j++) {
				if (mem[i][j] !== last[j]) {
					match = false;
					break;
				}
			}
			if (match) { return mem.length - 1 - i; }
		}
		return 0;
	}

	solve(input) {
		let mem = [input.split('\t').map(n => parseInt(n, 10))];
		while (this.loop(mem) === 0) { mem.push(this.redist(mem[mem.length - 1])); }
		this.setState({ solution: `Cycles: ${mem.length - 1}\nLoop: ${this.loop(mem)}` });
	}
}

export class S6b extends Solver {
}