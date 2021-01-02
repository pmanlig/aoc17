// import React from 'react';
import Solver from './Solver';

class Computer {
	constructor(prg, id, debug) {
		this.program = prg;
		this.registers = { p: id };
		this.debug = debug;
		this.input = [];
		this.output = [];
		this.sent = 0;
		this.received = 0;
		this.ip = 0;
		this.terminated = false;
	}

	run() {
		let deadlock = true;
		while (this.terminated !== true && this.ip > -1 && this.ip < this.program.length) {
			let op = this.program[this.ip][0];
			let x = this.program[this.ip][1];
			let y = this.val(this.program[this.ip][2]);
			let res = this[op](x, y);
			if (0 === res) { return this.terminated = deadlock; }
			deadlock = false;
			this.ip += res;
		}
		return this.terminated = true;
	}

	snd(x) {
		if (this.debug) {
			this.registers.snd = this.get(x);
		} else {
			this.sent++;
			this.output.push(this.val(x));
		}
		return 1;
	}
	val(x) { return isNaN(parseInt(x, 10)) ? this.get(x) : parseInt(x, 10); }
	get(x) { return this.registers[x] || 0; }
	set(x, y) { this.registers[x] = y; return 1; }
	add(x, y) { this.set(x, this.get(x) + y); return 1; }
	mul(x, y) { this.set(x, this.get(x) * y); return 1; }
	mod(x, y) { this.set(x, this.get(x) % y); return 1; }
	rcv(x) {
		if (this.debug) {
			if (this.get(x) === 0) { return 1; }
			this.firstRcv = this.registers.snd;
			return this.program.length; // terminate
		} else {
			if (this.input.length === 0) { return 0; }
			this.received++;
			this.set(x, this.input.shift());
			return 1;
		}
	}
	jgz(x, y) { return this.val(x) > 0 ? y : 1; }
}

export class S18a extends Solver {
	tests = [
		{ prg: "set a 1\nsnd a", expected: 1 },
		{ prg: "set a 1\nmul a 5\nsnd a", expected: 5 },
		{ prg: "set b 1\nset a b\nsnd a", expected: 1 },
		{ prg: "set a 3\nadd a 1\nsnd a", expected: 4 },
		{ prg: "set a 15\nmod a 6\nsnd a", expected: 3 },
		{ prg: "set a 15\nset b 10\njgz b 2\nmul a 2\nsnd a", expected: 15 },
		{ prg: "rcv a\nsnd a", input: [3], expected: 3 },
		{ prg: "set a 42\nrcv a\nsnd a", expected: undefined },
		{ prg: "set a 1\nset b 4\nmul a 2\nadd b -1\njgz b -2\nsnd a", expected: 16 },
		{ prg: "set a 1\nset b 400\nadd a 2\nadd b -1\njgz b -2\nsnd a", expected: 801 },
		{ prg: "set a 801\nsnd a", expected: 801 },
		{ prg: "set p 31\nmul p p\nsnd p", expected: 31 * 31 },
	];

	program(txt) {
		return txt.split('\n').map(l => l.split(' '));
	}

	runTest(i) {
		if (i < this.tests.length) {
			let prg = this.program(this.tests[i].prg);
			let c = new Computer(prg, 0);
			c.input = this.tests[i].input || [];
			c.run();
			this.tests[i].result = (c.output[0] === this.tests[i].expected) ? "OK" : "Fail";
			if (this.tests[i].result === "Fail") { console.log(c); }
			i++;
			this.setState({ tstRun: i });
			setTimeout(() => this.runTest(i), 1);
		}
	}

	test1() {
		let prg = this.program("set a 1");
		let c = new Computer(prg, 0);
		c.run();
		let res = c.registers.a === 1;
		console.log(c);
		this.setState({ tst1: res.toString() });
		setTimeout(() => this.test2(), 1);
	}

	solve(input) {
		// input = "snd 1\nsnd 2\nsnd p\nrcv a\nrcv b\nrcv c\nrcv d";
		let prg = input.split('\n').map(l => l.split(' '));
		let cmp = new Computer(prg, 0, true);
		cmp.run();
		let comps = [
			new Computer(prg, 0),
			new Computer(prg, 1)];
		comps[0].input = comps[1].output;
		comps[1].input = comps[0].output;
		let i = 0;
		while (i < 100000 && !(comps[0].terminated && comps[1].terminated)) { comps[i++ % 2].run(); }
		console.log(i, comps[0], comps[1]);
		this.setState({ solution: `First sound recovered: ${cmp.firstRcv}\nProgram 1 sent ${comps[1].sent} values` });
		setTimeout(() => this.runTest(0), 1);
	}

	customRender() {
		let { tstRun, solution } = this.state, i = 1;
		return <div>
			{this.tests.map(t => <p key={i++}>Test {i}: {t.result || "running..."}</p>)}
			<p>Running test {tstRun}</p>
			<pre>{solution}</pre>
		</div>;
	}
}

export class S18b extends Solver {
}
