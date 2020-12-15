//import React from 'react';
import Solver from './Solver';

export class S12a extends Solver {
	addLinks(input, links, nums) {
		input = input.match(/^(\d+) <-> (.*)/);
		let from = parseInt(input[1], 10);
		if (links[from] === undefined) { links[from] = []; }
		if (!nums.includes(from)) { nums.push(from); }
		input[2].match(/(\d+)/g).forEach(t => {
			let to = parseInt(t, 10);
			if (links[to] === undefined) { links[to] = []; }
			if (!nums.includes(to)) { nums.push(to); }
			if (!links[from].includes(to)) { links[from].push(to); }
			if (!links[to].includes(from)) { links[to].push(from); }
		});
	}

	createGroup(n, links) {
		let connected = [n];
		let i = 0;
		while (i < connected.length) {
			links[connected[i++]].forEach(j => { if (!connected.includes(j)) { connected.push(j); } });
		}
		return connected;
	}

	solve(input) {
		// input = "0 <-> 2\n1 <-> 1\n2 <-> 0, 3, 4\n3 <-> 2, 4\n4 <-> 2, 3, 6\n5 <-> 6\n6 <-> 4, 5";
		input = input.split('\n');
		let links = [];
		let numbers = [];
		input.forEach(l => this.addLinks(l, links, numbers));
		let connected = this.createGroup(0, links);
		let groups = [];
		while (numbers.length > 0) {
			let g = this.createGroup(numbers.shift(), links);
			groups.push(g);
			numbers = numbers.filter(n => !g.includes(n));
		}
		this.setState({ solution: `# connected programs: ${connected.length}\n# groups: ${groups.length}` });
	}
}

export class S12b extends Solver {
}