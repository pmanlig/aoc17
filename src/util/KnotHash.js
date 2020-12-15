const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

export default class KnotHash { 
	constructor(n) {
		this.position = 0;
		this.skip = 0;
		this.numbers = [];
		for (let i = 0; i < n; i++) { this.numbers.push(i); }
	}

	knot(n) {
		let rev = [];
		for (let i = n - 1; i >= 0; i--) {
			rev.push(this.numbers[(this.position + i) % this.numbers.length]);
		}
		for (let i = 0; i < n; i++) {
			this.numbers[(this.position + i) % this.numbers.length] = rev[i];
		}
		this.position = (this.position + n + this.skip++) % this.numbers.length;
	}

	static calculate(s) {
		let kh = new KnotHash(256);
		let seq = s.split('').map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
		for (let i = 0; i < 64; i++) {
			seq.forEach(n => kh.knot(n));
		}
		let hash = [];
		for (let i = 0; i < 16; i++) {
			let acc = 0;
			for (let j = 0; j < 16; j++) {
				acc = acc ^ kh.numbers[i * 16 + j];
			}
			hash.push(acc);
		}
		return hash.map(n => hex[n >>> 4] + hex[n & 15]).join('');
	}
}
