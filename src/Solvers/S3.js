// import React from 'react';
import Solver from './Solver';

class Map {
	constructor() {
		this.data = [];
	}

	y(y) {
		if (this.data[y] === undefined) this.data[y] = [];
		return this.data[y];
	}

	put(x, y, val) {
		this.y(y)[x] = val;
	}

	get(x, y) {
		return this.y(y)[x] || 0;
	}

	sum(x, y) {
		return this.get(x + 1, y + 1) +
			this.get(x + 1, y) +
			this.get(x + 1, y - 1) +
			this.get(x, y + 1) +
			this.get(x, y - 1) +
			this.get(x - 1, y + 1) +
			this.get(x - 1, y) +
			this.get(x - 1, y - 1);
	}
}

export class S3a extends Solver {
	step({ x, y, r }) {
		if (x === r && y === r) { return { x: x + 1, y: y, r: r + 1 }; }
		if (x === r && y > -r) { return { x: x, y: y - 1, r: r }; }
		if (y === -r && x > -r) { return { x: x - 1, y: y, r: r }; }
		if (x === -r && y < r) { return { x: x, y: y + 1, r: r }; }
		if (y === r && x < r) { return { x: x + 1, y: y, r: r }; }
	}

	cell(n) {
		let pos = 1;
		let coord = { x: 0, y: 0, r: 0 }
		while (pos++ < n) {
			coord = this.step(coord);
		}
		return coord;
	}

	solve(input) {
		input = parseInt(input, 10);
		let map = new Map();
		map.put(0, 0, 1);
		let pos = 1;
		let coord = { x: 0, y: 0, r: 0 }
		let val = 1;
		while (pos++ < input) {
			coord = this.step(coord);
			if (val <= input) {
				val = map.sum(coord.x, coord.y);
				map.put(coord.x, coord.y, val);
			}
		}
		this.setState({ solution: `Distance: ${Math.abs(coord.x) + Math.abs(coord.y)}\nValue: ${val}` });
	}
}

export class S3b extends Solver {
}