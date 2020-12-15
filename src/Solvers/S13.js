//import React from 'react';
import Solver from './Solver';

class Scanner {
	constructor(depth, range) {
		this.depth = depth;
		this.range = range;
	}

	period() { return 2 * (this.range - 1); }
	caught(t) { return (t % this.period()) === 0; }
	severity() { return this.depth * this.range; }
}

export class S13a extends Solver {
	caught(scanners, delay) {
		return scanners.filter(s => s.caught(s.depth + delay));
	}

	solve(input) {
		// input = "0: 3\n1: 2\n4: 4\n6: 4";
		let scanners = input.split('\n').map(s => s.match(/(\d+)/g)).map(s => new Scanner(parseInt(s[0], 10), parseInt(s[1], 10)));
		let totalSeverity = scanners.filter(s => s.caught(s.depth)).map(s => s.severity()).reduce((a, b) => a + b, 0);
		let delay = 0;
		let caught = this.caught(scanners, delay);
		while (caught.length > 0) {
			delay++;
			caught = this.caught(scanners, delay);
		}
		this.setState({ solution: `Total severity: ${totalSeverity}\nMinimum delay: ${delay}` });
	}
}

export class S13b extends Solver {
}