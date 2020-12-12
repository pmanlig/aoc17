// import React from 'react';
import Solver from './Solver';

class Stream {
	constructor(txt, pos) {
		this.data = txt;
		this.pos = pos || 0;
	}

	peek() {
		return this.data[this.pos];
	}

	next() {
		return this.data[this.pos++];
	}

	marker() {
		return new Stream(this.data, this.pos);
	}

	text() {
		return this.data.substring(this.pos, this.pos + 20);
	}
}

class Garbage {
	constructor(garbage) {
		this.garbage = garbage;
	}

	static fromStream(stream) {
		let garbage = 0;
		stream.next(); // skip <
		while (stream.peek() !== '>') {
			if (stream.next() === '!') { stream.next(); } else { garbage++; }
		}
		stream.next(); // skip >
		return new Garbage(garbage);
	}

	totalScore() {
		return 0;
	}

	garbageCount() {
		return this.garbage;
	}
}

class StreamObject {
	constructor(score, children, marker) {
		this.score = score;
		this.children = children;
		this.marker = marker;
	}

	static fromStream(stream, score, marker) {
		let children = [];
		stream.next(); // skip {
		while (stream.peek() !== '}') {
			if (stream.peek() === ',') { stream.next(); }
			if (stream.peek() === '{') { children.push(StreamObject.fromStream(stream, score + 1, stream.marker())); }
			if (stream.peek() === '<') { children.push(Garbage.fromStream(stream)); }
		}
		stream.next(); // skip }
		return new StreamObject(score, children, marker);
	}

	totalScore() {
		// console.log(this.marker.text());
		// console.log(this.children);
		return this.score + this.children.reduce((a, b) => a + b.totalScore(), 0);
	}

	garbageCount() {
		return this.children.reduce((a, b) => a + b.garbageCount(), 0);
	}
}

export class S9a extends Solver {
	solve(input) {
		let s = new Stream(input);
		let tree = StreamObject.fromStream(s, 1, s.marker());
		console.log(tree);
		let score = tree.totalScore();
		let garbage = tree.garbageCount();
		this.setState({ solution: `Total score: ${score}\nGarbage: ${garbage}` });
	}
}

export class S9b extends Solver {
}