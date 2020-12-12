// import React from 'react';
import Solver from './Solver';

class Program {
	constructor(txt) {
		let params = txt.match(/^(\w+) \((\d+)\)/);
		this.name = params[1];
		this.wt = parseInt(params[2], 10);
		this.children = [];
		let match, regex = /(?:-> |, )(\w+)/g;
		while ((match = regex.exec(txt), match !== null)) { this.children.push(match[1]); }
	}

	weight() {
		return this.wt + this.children.reduce((a, b) => a + b.weight(), 0);
	}
}

export class S7a extends Solver {
	findRoot(input) {
		let children = [];
		input.forEach(p => { children = children.concat(p.children); });
		return input.find(p => !children.includes(p));
	}

	balance(prg, wt) {
		let childwts = prg.children.map(c => { return { child: c, weight: c.weight() }; });
		// console.log(childwts);
		let unbalanced = childwts.find(c => childwts.filter(d => d.weight !== c.weight).length > 1);
		if (undefined === unbalanced) { return wt - (prg.weight() - prg.wt); }
		let correct = childwts.find(c => c.weight !== unbalanced.weight).weight;
		// console.log(`Child ${unbalanced.child.name} is unbalanced, weight should be ${correct}`);
		return this.balance(unbalanced.child, correct);
	}

	findWeight(input) {
		let root = this.findRoot(input);
		return this.balance(root, root.weight());
	}

	connect(input) {
		let map = {};
		input.forEach(p => map[p.name] = p);
		input.forEach(p => p.children = p.children.map(c => map[c]));
	}

	solve(input) {
		input = input.split('\n').map(t => new Program(t));
		this.connect(input);
		this.setState({ solution: `Root: ${this.findRoot(input).name}\nAdjusted weight: ${this.findWeight(input)}` });
	}
}

export class S7b extends Solver {
}