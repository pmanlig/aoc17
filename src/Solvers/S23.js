// import React from 'react';
import Solver from './Solver';

class Computer {
	prg = [];
	ip = 0;
	numMul = 0;
	registers = {};

	run() {
		while (this.ip > -1 && this.ip < this.prg.length) {
			let op = this.prg[this.ip][0];
			let x = this.prg[this.ip][1];
			let y = this.val(this.prg[this.ip][2]);
			this.ip += this[op](x, y);
		}
	}

	val(x) {
		if (isNaN(parseInt(x, 10))) { return this.get(x); }
		return parseInt(x, 10);
	}

	get(x) { return this.registers[x] || 0; }
	set(x, y) { this.registers[x] = y; return 1; }
	sub(x, y) { this.registers[x] -= y; return 1; }
	mul(x, y) { this.registers[x] *= y; this.numMul++; return 1; }
	jnz(x, y) { return this.val(x) === 0 ? 1 : y; }

	static fromString(txt) {
		let c = new Computer();
		c.prg = txt.split('\n').map(l => l.split(' '));
		return c;
	}
}

export class S23a extends Solver {
	calc() {
		let primes = [2, 3, 5, 7, 11, 13, 19, 23, 29, 31];
		for (let i = 37; i <= Math.sqrt(124900); i += 2) {
			if (!primes.some(p => (i % p) === 0)) { primes.push(i); }
		}
		let h = 0;
		for (let b = 107900; b <= 124900; b += 17) {
			if (primes.some(p => (b % p) === 0)) { h++; }
		}
		return h;
	}

	solve(input) {
		let cmp = Computer.fromString(input);
		cmp.run();
		let mul = cmp.numMul;
		let h = this.calc();
		this.setState({ solution: `# mul operation performed: ${mul}\nRegister h: ${h}` });
	}
}

export class S23b extends Solver {
}