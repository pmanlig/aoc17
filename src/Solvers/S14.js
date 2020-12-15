//import React from 'react';
import Solver from './Solver';
import KnotHash from '../util/KnotHash';

const count_map = {
	'0': 0,
	'1': 1,
	'2': 1,
	'3': 2,
	'4': 1,
	'5': 2,
	'6': 2,
	'7': 3,
	'8': 1,
	'9': 2,
	'a': 2,
	'b': 3,
	'c': 2,
	'd': 3,
	'e': 3,
	'f': 4
}

const expand_map = {
	'0': [0, 0, 0, 0],
	'1': [0, 0, 0, 1],
	'2': [0, 0, 1, 0],
	'3': [0, 0, 1, 1],
	'4': [0, 1, 0, 0],
	'5': [0, 1, 0, 1],
	'6': [0, 1, 1, 0],
	'7': [0, 1, 1, 1],
	'8': [1, 0, 0, 0],
	'9': [1, 0, 0, 1],
	'a': [1, 0, 1, 0],
	'b': [1, 0, 1, 1],
	'c': [1, 1, 0, 0],
	'd': [1, 1, 0, 1],
	'e': [1, 1, 1, 0],
	'f': [1, 1, 1, 1]
}

class Position {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	adjacent(p) {
		return (this.y === p.y && Math.abs(this.x - p.x) === 1) || (this.x === p.x && Math.abs(this.y - p.y) === 1);
	}
}

class Region {
	constructor() { this.positions = []; }

	adjacent(pos) {
		return this.positions.filter(p => p.adjacent(pos)).length > 0;
	}

	addPos(pos) { this.positions.push(pos); }
	addRegion(reg) { this.positions = this.positions.concat(reg.positions) }
}

class RegionList {
	constructor() {
		this.regions = [];
	}

	add(x, y) {
		let pos = new Position(x, y);
		let matches = this.regions.filter(r => r.adjacent(pos));
		this.regions = this.regions.filter(r => !r.adjacent(pos));
		let n = new Region();
		n.addPos(pos);
		matches.forEach(r => n.addRegion(r));
		this.regions.push(n);
	}

	count() { return this.regions.length; }
}

class Map {
	constructor(hashes) {
		this.data = hashes.map(h => h.split('').map(c => expand_map[c]).reduce((a, b) => a.concat(b), []));
	}

	regionCount() {
		let regions = new RegionList();
		for (let y = 0; y < this.data.length; y++) {
			for (let x = 0; x < this.data[y].length; x++) {
				if (this.data[y][x] === 1) { regions.add(x, y); }
			}
		}
		return regions.count();
	}
}

export class S14a extends Solver {
	solve(input) {
		// input = "flqrgnkx";
		let hashes = [];
		for (let i = 0; i < 128; i++) {
			hashes.push(KnotHash.calculate(`${input}-${i}`));
		}
		let used = hashes.map(h => h.split('').map(c => count_map[c]).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0);
		let map = new Map(hashes);
		this.setState({ solution: `Used: ${used}\nRegions: ${map.regionCount()}` });
	}
}

export class S14b extends Solver {
}