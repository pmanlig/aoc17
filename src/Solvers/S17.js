//import React from 'react';
import Solver from './Solver';

export class S17a extends Solver {
	solve(input) {
		// input = "3";
		input = parseInt(input, 10);
		let pos = 0, buf = [0];
		while (buf.length < 2018) {
			pos = (pos + input) % buf.length;
			buf.splice(++pos, 0, buf.length);
			// console.log(`[${buf.join(", ")}] (${pos})`);
		}
		let val1 = buf[(pos + 1) % buf.length];
		let step = 1, val2 = 1;
		pos = 1;
		while (step++ < 50000000) {
			pos = (pos + input) % step;
			if (pos++ === 0) { val2 = step; }
		}
		this.setState({ solution: `Value: ${val1}\nAdjusted value: ${val2}` });
	}
}

export class S17b extends Solver {
}