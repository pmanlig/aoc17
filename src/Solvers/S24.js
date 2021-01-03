// import React from 'react';
import Solver from './Solver';

class Part {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.wt = x + y;
	}

	connect(x) {
		return this.x === x ? this.y : (this.y === x ? this.x : -1);
	}

	static fromString(txt) {
		txt = txt.split('/');
		return new Part(parseInt(txt[0], 10), parseInt(txt[1], 10))
	}
}

class Bridge {
	constructor(used, head, parts) {
		this.used = used;
		this.head = head;
		this.parts = parts;
	}

	weight() {
		return this.used.map(p => p.wt).reduce((a, b) => a + b, 0);
	}
}

export class S24a extends Solver {
	buildStrong(parts) {
		let heads = parts.filter(p => p.connect(0) !== -1);
		let search = heads.map(h => new Bridge([h], h.connect(0), parts.filter(p => p !== h)));
		let bridge = null;
		while (search.length > 0) {
			let b = search.pop();
			let next = b.parts.filter(p => p.connect(b.head) !== -1);
			if (next.length > 0) {
				next = next.map(h => new Bridge([h].concat(b.used), h.connect(b.head), b.parts.filter(p => p !== h)));
				search = search.concat(next);
			} else if (bridge === null || b.weight() > bridge.weight()) {
				bridge = b;
			}
		}
		return bridge;
	}

	buildLong(parts) {
		let heads = parts.filter(p => p.connect(0) !== -1);
		let search = heads.map(h => new Bridge([h], h.connect(0), parts.filter(p => p !== h)));
		let bridge = null;
		while (search.length > 0) {
			let b = search.pop();
			let next = b.parts.filter(p => p.connect(b.head) !== -1);
			if (next.length > 0) {
				next = next.map(h => new Bridge([h].concat(b.used), h.connect(b.head), b.parts.filter(p => p !== h)));
				search = search.concat(next);
			} else if (bridge === null || b.used.length > bridge.used.length || (b.used.length === bridge.used.length && b.weight() > bridge.weight())) {
				bridge = b;
			}
		}
		return bridge;
	}

	solve(input) {
		let parts = input.split('\n').map(p => Part.fromString(p));
		let strongest = this.buildStrong(parts);
		let longest = this.buildLong(parts);
		this.setState({ solution: `Parts: ${parts.length}\nParts used for strongest: ${strongest.used.length}\nStrongest strength: ${strongest.weight()}\nParts used for longest: ${longest.used.length}\nLongest strength: ${longest.weight()}` });
	}
}

export class S24b extends Solver {
}