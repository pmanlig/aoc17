// import React from 'react';
import Solver from './Solver';

class State {
	constructor(state, rule0, rule1) {
		this.state = state;
		this.newVal = [parseInt(rule0[0], 10), parseInt(rule1[0], 10)];
		this.move = [rule0[1] === "right" ? 1 : -1, rule1[1] === "right" ? 1 : -1];
		this.nextState = [rule0[2], rule1[2]];
	}

	static fromString(txt) {
		let reg = /If the current value is [01]:\s+- Write the value [01].\s+- Move one slot to the (right|left).\s+- Continue with state [A-Z]/g;
		let reg2 = /If the current value is [01]:\s+- Write the value ([01]).\s+- Move one slot to the (right|left).\s+- Continue with state ([A-Z])/;
		let stateTag = txt.match(/^In state ([A-Z]):/)[1];
		let rules = txt.match(reg).map(r => r.match(reg2).slice(1));
		let s = new State(stateTag, ...rules);
		return s;
	}
}

class TuringMachine {
	tape = [];
	cursor = 0;
	currentState = 'A';
	low = 0;
	high = 0;
	states = {};
	checksumAt = 0;

	run() {
		let step = 0;
		while (step++ < this.checksumAt) {
			let s = this.states[this.currentState];
			let v = this.tape[this.cursor] || 0;
			this.tape[this.cursor] = s.newVal[v];
			this.currentState = s.nextState[v];
			this.cursor += s.move[v];
			if (this.cursor < this.low) { this.low = this.cursor; }
			if (this.cursor > this.high) { this.high = this.cursor; }
		}
	}

	checksum() {
		let count = 0;
		for (let i = this.low; i <= this.high; i++) { count += this.tape[i] || 0; }
		return count;
	}

	static fromString(txt) {
		let t = new TuringMachine();
		let prg = txt.split("\n\n");
		let init = prg.shift().split('\n');
		t.currentState = init[0].match(/^Begin in state ([A-Z]).$/)[1];
		t.checksumAt = parseInt(init[1].match(/^Perform a diagnostic checksum after (\d*) steps.$/)[1], 10);
		prg.map(s => State.fromString(s)).forEach(s => t.states[s.state] = s);
		return t;
	}
}

export class S25a extends Solver {
	solve(input) {
		let turing = TuringMachine.fromString(input);
		turing.run();
		this.setState({ solution: `Checksum after ${turing.checksumAt} steps: ${turing.checksum()}` });
	}
}

export class S25b extends Solver {
}