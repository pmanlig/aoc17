//import React from 'react';
import Solver from './Solver';

class HexGrid {
	constructor(n, ne, nw, s, se, sw) {
		this.s = s || 0;
		this.se = se || 0;
		this.sw = sw || 0;
		this.n = n || 0;
		this.ne = ne || 0;
		this.nw = nw || 0;
	}

	normalize(l, m, r, log) {
		if (log) { console.log(`Normalizing - l: ${l}, m: ${m}, r: ${r}`); }
		if (l * r > 0) { // l & r adjust m in the same direction
			let a = (l > 0) ? Math.min(l, r) : Math.max(l, r);
			m += a;
			l -= a;
			r -= a;
			if (log) { console.log(`Same direction - l: ${l}, m: ${m}, r: ${r}`); }
		} else if (l * m < 0) { // l adjust m & r
			m += l;
			r -= l;
			l = 0;
			if (log) { console.log(`l counteracts m - l: ${l}, m: ${m}, r: ${r}`); }
		} else if (r * m < 0) { // r adjust m & l
			m += r;
			l -= r;
			r = 0;
			if (log) { console.log(`r counteracts m - l: ${l}, m: ${m}, r: ${r}`); }
		}
		return { l: l, m: m, r: r };
	}

	shortest(log) {
		let { n, ne, nw, s, se, sw } = this;
		n = n - s;
		ne = ne - sw;
		se = se - nw;
		if (log) { console.log(`n: ${n}, ne: ${ne}, se: ${se}`); }
		if (Math.abs(se) >= Math.abs(n) && Math.abs(se) >= Math.abs(ne)) { // se is longest
			if (log) { console.log(`se is longest`); }
			let { l, m, r } = this.normalize(ne, se, -n, log);
			ne = l;
			se = m;
			n = r;
		} else if (Math.abs(ne) <= Math.abs(n) && Math.abs(ne) <= Math.abs(se)) { // ne is longest
			if (log) { console.log(`ne is longest`); }
			let { l, m, r } = this.normalize(n, ne, se, log);
			n = l;
			ne = m;
			se = r;
		} else { // n is longest
			if (log) { console.log(`n is longest`); }
			let { l, m, r } = this.normalize(-se, n, ne, log);
			se = l;
			n = m;
			ne = r;
		}
		if (log) { console.log(`n: ${n}, ne: ${ne}, se: ${se}`); }
		return Math.abs(n) + Math.abs(ne) + Math.abs(se);
	}
}

export class S11a extends Solver {
	solve(input) {
		// let i = 1;
		// console.log(`Test ${i++}: ${new HexGrid(0, 0, 0, 0, 0, 0).shortest()} (should be 0)`);
		// console.log(`Test ${i++}: ${new HexGrid(0, 3, 0, 0, 0, 0).shortest()} (should be 3)`);
		// console.log(`Test ${i++}: ${new HexGrid(0, 2, 0, 2, 0, 0).shortest()} (should be 2)`);
		// console.log(`Test ${i++}: ${new HexGrid(0, 0, 0, 0, 2, 3).shortest()} (should be 3)`);
		// console.log(`Test ${i++}: ${new HexGrid(0, 0, 94, 307, 0, 368).shortest()}`);
		// console.log(`Test ${i++}: ${new HexGrid(1641, 1363, 1207, 875, 1207, 737).shortest(true)}`);
		input = input.split(',');
		let grid = new HexGrid();
		let max = 0;
		input.forEach(d => {
			grid[d]++;
			let dist = grid.shortest();
			if (dist > max) { max = dist; }
		});
		this.setState({ solution: `Instructions: ${input.length}\nDistance: ${grid.shortest()}\nMax distance: ${max}` });
	}
}

export class S11b extends Solver {
}