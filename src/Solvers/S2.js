// import React from 'react';
import Solver from './Solver';

export class S2a extends Solver {
	dividers(l) {
		for (let i = 0; i < l.length - 1; i++) {
			for (let j = i + 1; j < l.length; j++) {
				if (l[i] % l[j] === 0) return l[i] / l[j];
				if (l[j] % l[i] === 0) return l[j] / l[i];
			}
		}
	}

	solve(input) {
		input = input.split('\n').map(l => l.split('\t').map(n => parseInt(n, 10)));
		let checksum = input.map(l => Math.max(...l) - Math.min(...l)).reduce((a, b) => a + b, 0);
		let checksum2 = input.map(l => this.dividers(l)).reduce((a, b) => a + b, 0);
		this.setState({ solution: `Checksum(1): ${checksum}\nChecksum(2): ${checksum2}` });
	}
}

export class S2b extends Solver {
}