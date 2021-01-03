import React from 'react';
import Solver from './Solver';

const up = { x: 0, y: -1, c: '^', e: '|' };
const down = { x: 0, y: 1, c: 'v', e: '|' };
const left = { x: -1, y: 0, c: '<', e: '-' };
const right = { x: 1, y: 0, c: '>', e: '-' };

class CharGrid {
	constructor(txt) {
		this.data = txt.split('\n').map(l => l.split(''));
	}

	cell(x, y) {
		return this.data[y][x];
	}

	set(x, y, c) {
		this.data[y][x] = c;
	}
}

export class S19a extends Solver {
	findLetters(grid) {
		let x = 0, y = 0, chars = "", steps = 0;
		let dir = down;
		while (grid.cell(x, y) !== dir.e) { x++; }
		while (true) {
			let c = grid.cell(x, y);
			if (c === ' ' || c === undefined) { break; }
			else if (c === dir.e) { grid.set(x, y, dir.c); }
			else if (c.match(/[A-Z]/) !== null) { chars += c; }
			else if (c === '+') {
				if (dir.e === '|') {
					let l = grid.cell(x + left.x, y + left.y);
					if (l === ' ') { dir = right; }
					else { dir = left; }
				} else {
					let u = grid.cell(x + up.x, y + up.y);
					if (u === ' ') { dir = down; }
					else { dir = up; }
				}
			}
			x += dir.x;
			y += dir.y;
			steps++;
		}
		this.setState({ grid: grid, chars: chars, final: { x: x, y: y }, steps: steps });
	}

	solve(input) {
		// input = "     |          \n     |  +--+    \n     A  |  C    \n F---|--|-E---+ \n     |  |  |  D \n     +B-+  +--+ \n                ";
		let grid = new CharGrid(input);
		this.setState({ solution: `Loaded grid ${grid.data[0].length}×${grid.data.length}`, grid: grid });
		setTimeout(() => this.findLetters(grid), 1);
	}

	customRender() {
		let { solution, grid, chars, final, steps } = this.state;
		return <div>
			<p>{solution}</p>
			<p>Chars: {chars}</p>
			<p>Steps: {steps}</p>
			{final && <p>Final position: [x: {final.x},y: {final.y}]</p>}
			{grid && <pre>{grid.data.map(l => l.join('')).join('\n')}</pre>}
		</div>;
	}
}

export class S19b extends Solver {
}