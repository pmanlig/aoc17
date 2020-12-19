//import React from 'react';
import Solver from './Solver';

export class S16a extends Solver {
	reorder(prg, i) {
		let m = i.match(/^s(\d+)/);
		if (m) {
			m[1] = parseInt(m[1], 10);
			return prg.slice(prg.length - m[1]).concat(prg.slice(0, prg.length - m[1]));
		}
		m = i.match(/^x(\d+)\/(\d+)/);
		if (m) {
			m[1] = parseInt(m[1], 10);
			m[2] = parseInt(m[2], 10);
			let c = prg[m[1]];
			prg[m[1]] = prg[m[2]];
			prg[m[2]] = c;
			return prg;
		}
		m = i.match(/^p([a-p])\/([a-p])/);
		if (m) {
			return prg.map(p => p === m[1] ? m[2] : (p === m[2] ? m[1] : p));
		}
		throw new Error(`Error: ${i}`);
	}

	solve(input) {
		// input = "s3";
		input = input.split(',');
		let prg = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
		let states = [];
		let update = i => prg = this.reorder(prg, i);
		while (!states.includes(prg.join(''))) {
			states.push(prg.join(''));
			input.forEach(update);
		}
		this.setState({ solution: `Instructions: ${input.length}\nFinal order: ${states[1]}\nBillionth state: ${states[1000000000 % states.length]}` });
	}
}

export class S16b extends Solver {
}