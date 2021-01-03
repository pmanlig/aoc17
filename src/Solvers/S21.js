// import React from 'react';
import Solver from './Solver';

const twoByTwo = [
	[0, 1, 2, 3],
	[1, 0, 3, 2],
	[2, 0, 3, 1],
	[3, 1, 2, 0],
	[3, 2, 1, 0],
	[2, 3, 0, 1],
	[1, 3, 0, 2],
	[0, 2, 1, 3]
];

const threeByThree = [
	[0, 1, 2, 3, 4, 5, 6, 7, 8],
	[2, 1, 0, 5, 4, 3, 8, 7, 6],
	[6, 3, 0, 7, 4, 1, 8, 5, 2],
	[8, 5, 2, 7, 4, 1, 6, 3, 0],
	[8, 7, 6, 5, 4, 3, 2, 1, 0],
	[6, 7, 8, 3, 4, 5, 0, 1, 2],
	[2, 5, 8, 1, 4, 7, 0, 3, 6],
	[0, 3, 6, 1, 4, 7, 2, 5, 8],
];

class CharGrid {
	data = [];

	static fromString(txt) {
		let g = new CharGrid();
		g.data = txt.split('/').map(l => l.split(''));
		return g;
	}

	get(x, y) {
		if (this.data[y] === undefined) { this.data[y] = []; }
		return this.data[y][x];
	}

	set(x, y, c) {
		if (this.data[y] === undefined) { this.data[y] = []; }
		this.data[y][x] = c;
	}

	count() {
		return this.data.map(l => l.filter(c => c === '#').length).reduce((a, b) => a + b, 0);
	}

	enhance(rules) {
		let m = ((this.data.length % 2) === 0) ? 2 : 3;
		let o = m + 1;
		let d = Math.floor(this.data.length / m);
		let n = new CharGrid();
		// console.log(`Enhancing ${m}×${m} => ${o}×${o}`);
		for (let y = 0; y < d; y++) {
			for (let x = 0; x < d; x++) {
				let k = (m === 3) ? 512 : 0;
				let e = m * m - 1;
				for (let i = 0; i < m * m; i++) {
					k += (2 ** e--) * ((this.get(x * m + (i % m), y * m + Math.floor(i / m)) === '#') ? 1 : 0);
				}
				// console.log(`Processing square at ${x * m},${y * m}. Key is ${k}`);
				let p = rules[k];
				for (let i = 0; i < o * o; i++) {
					n.set(
						x * o + i % o,
						y * o + Math.floor(i / o),
						p.get(i % o, Math.floor(i / o)));
				}
			}
		}
		return n;
	}
}

class Rule {
	static fromString(txt) {
		let r = new Rule();
		let match = txt.match(/^([.#/]*) => ([.#/]*)$/);
		r.output = CharGrid.fromString(match[2]);
		r.keys = [];
		let m = match[1].split('').filter(c => c !== '/').map(c => c === '.' ? 0 : 1);
		if (m.length === 4) {
			twoByTwo.forEach(config => {
				r.keys.push(8 * m[config[0]] + 4 * m[config[1]] + 2 * m[config[2]] + m[config[3]]);
			});
		} else {
			threeByThree.forEach(config => {
				r.keys.push(512 + 256 * m[config[0]] + 128 * m[config[1]] + 64 * m[config[2]] +
					32 * m[config[3]] + 16 * m[config[4]] + 8 * m[config[5]] +
					4 * m[config[6]] + 2 * m[config[7]] + m[config[8]]);
			});
		}
		return r;
	}
}

export class S21a extends Solver {
	enhance(grid, rules, n) {
		grid = grid.enhance(rules);
		this.setState({ grid: grid });
		if (n === 5) { this.setState({ lit5: grid.count() }) }
		if (n === 18) { this.setState({ lit18: grid.count() }) }
		if (n++ < 18) { setTimeout(() => this.enhance(grid, rules, n), 1000); }
	}

	solve(input) {
		// input = "../.# => ##./#../...\n.#./..#/### => #..#/..../..../#..#";
		let grid = CharGrid.fromString(".#./..#/###");
		let rules = [];
		input.split('\n').map(r => Rule.fromString(r)).forEach(r => {
			r.keys.forEach(k => rules[k] = r.output);
		});
		console.log(rules);
		this.setState({ rules: rules, grid: grid });
		setTimeout(() => this.enhance(grid, rules, 1), 1000);
	}

	customRender() {
		let { rules, grid, lit5, lit18 } = this.state;
		return <div>
			<p># rules: {rules.length}</p>
			{lit5 && <p># lit after step 5: {lit5}</p>}
			{lit18 && <p># lit after step 18: {lit18}</p>}
			{grid && <p># lit: {grid.count()}</p>}
			{grid && <pre>{grid.data.map(l => l.join('')).join('\n')}</pre>}
		</div>;
	}
}

export class S21b extends Solver {
}