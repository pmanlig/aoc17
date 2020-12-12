// import React from 'react';
import Solver from './Solver';

export class S4a extends Solver {
	valid(p, v) {
		let m = {}
		p = p.split(' ');
		for (let i = 0; i < p.length; i++) {
			let x = v(p[i])
			if (m[x] === 1) { return false; }
			m[x] = 1;
		}
		return true;
	}

	solve(input) {
		input = input.split('\n');
		this.setState({ solution: `# valid(1): ${input.filter(p => this.valid(p, x => x)).length}\n# valid(2): ${input.filter(p => this.valid(p, x => x.split('').sort().join(''))).length}` });
	}
}

export class S4b extends Solver {
}