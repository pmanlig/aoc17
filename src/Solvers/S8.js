// import React from 'react';
import Solver from './Solver';

class Computer {
	constructor() {
		this.registers = {};
		this.max = -Infinity;
	}

	get(id) {
		return this.registers[id] || 0;
	}

	put(id, val) {
		this.registers[id] = val;
		if (this.max < val) this.max = val;
	}

	exec(txt) {
		let params = txt.match(/^(\w+) (inc|dec) (-?\d+) if (\w+) (>=|<=|>|<|==|!=) (-?\d+)/);
		if (params === null) console.log(txt);
		let reg = params[1];
		let sign = params[2];
		let amnt = parseInt(params[3], 10);
		let cmpReg = params[4];
		let cmpOp = params[5];
		let cmpVal = parseInt(params[6], 10);
		let c = this.get(cmpReg);
		// console.log(`${cmpReg} is ${c} (${cmpReg} ${cmpOp} ${cmpVal})`);
		if (cmpOp === "!=" && c === cmpVal) { return; }
		if (cmpOp === "<=" && c > cmpVal) { return; }
		if (cmpOp === ">=" && c < cmpVal) { return; }
		if (cmpOp === "==" && c !== cmpVal) { return; }
		if (cmpOp === "<" && c >= cmpVal) { return; }
		if (cmpOp === ">" && c <= cmpVal) { return; }
		let v = this.get(reg);
		v += (sign === "inc" ? 1 : -1) * amnt;
		this.put(reg, v);
		// console.log(`${txt}: Modified register ${reg}`);
		// console.log(this.registers);
	}

	largest() {
		return Math.max(...Object.keys(this.registers).map(k => this.registers[k]));
	}
}

export class S8a extends Solver {
	solve(input) {
		// input = "b inc 5 if a > 1\na inc 1 if b < 5\nc dec -10 if a >= 1\nc inc -20 if c == 10";
		input = input.split('\n');
		let c = new Computer();
		input.forEach(l => c.exec(l));
		this.setState({ solution: `Max register: ${c.largest()}\nMax value: ${c.max}` });
	}
}

export class S8b extends Solver {
}