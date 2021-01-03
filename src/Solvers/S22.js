// import React from 'react';
import Solver from './Solver';

class Coord2D {
	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
}

class CharGrid {
	data = [];

	static fromString(txt) {
		let g = new CharGrid();
		g.data = txt.split('\n').map(l => l.split(''));
		return g;
	}

	get(x, y) {
		if (this.data[y] === undefined) { this.data[y] = []; }
		return this.data[y][x] || '.';
	}

	set(x, y, c) {
		if (this.data[y] === undefined) { this.data[y] = []; }
		this.data[y][x] = c;
	}
}

class Carrier {
	static delta = [
		new Coord2D(0, -1),
		new Coord2D(-1, 0),
		new Coord2D(0, 1),
		new Coord2D(1, 0),
	]; // left turn = +1, right turn = -1

	constructor(grid) {
		this.face = 0;
		this.grid = grid;
		let offset = Math.floor(grid.data.length / 2);
		this.pos = new Coord2D(offset, offset);
		this.infections = 0;
	}

	move(evo) {
		let { x, y } = this.pos;
		switch (this.grid.get(x, y)) {
			case '#':
				this.face = (this.face + 3) % 4; // right
				this.grid.set(x, y, evo ? 'F' : '.');
				break;
			case 'F':
				this.face = (this.face + 2) % 4; // revserse
				this.grid.set(x, y, '.');
				break;
			case '~':
				this.grid.set(x, y, '#');
				this.infections++;
				break;
			default:
				this.face = (this.face + 1) % 4; // left
				this.grid.set(x, y, evo ? '~' : '#');
				if (!evo) { this.infections++; }
				break;
		}
		this.pos.x += Carrier.delta[this.face].x;
		this.pos.y += Carrier.delta[this.face].y;
	}
}

export class S22a extends Solver {
	move(c, n) {
		for (let i = 0; i < 100; i++, n++) {
			c.move();
		}
		this.setState({ carrier: c, grid: c.grid, steps: n });
		if (n < 10000) {
			setTimeout(() => this.move(c, n), 1);
		}
	}

	solve(input) {
		input = "..#\n#..\n...";
		let g = CharGrid.fromString(input);
		let c = new Carrier(g);
		this.setState({ grid: g, carrier: c, steps: 0 });
		setTimeout(() => this.move(c, 0), 1);
	}

	customRender() {
		let { grid, carrier, steps } = this.state;
		return <div>
			{grid && <p>Grid size: {grid.data[0].length}×{grid.data.length}</p>}
			{steps && <p>Steps: {steps}</p>}
			{carrier && <p>Infections: {carrier.infections}</p>}
			{grid && <pre>{grid.data.map(l => l.join('')).join('\n')}</pre>}
		</div>;
	}
}

export class S22b extends Solver {
	move(c, n) {
		let limit = 10000000;
		for (let i = 0; i < 10000 && n < limit; i++, n++) {
			c.move(true);
		}
		this.setState({ carrier: c, grid: c.grid, steps: n });
		if (n < limit) {
			setTimeout(() => this.move(c, n), 1);
		}
	}

	solve(input) {
		// input = "..#\n#..\n...";
		let g = CharGrid.fromString(input);
		let c = new Carrier(g);
		this.setState({ grid: g, carrier: c, steps: 0 });
		setTimeout(() => this.move(c, 0), 1);
	}

	customRender() {
		let { grid, carrier, steps } = this.state;
		return <div>
			{grid && <p>Grid size: {grid.data[0].length}×{grid.data.length}</p>}
			{steps && <p>Steps: {steps}</p>}
			{carrier && <p>Infections: {carrier.infections}</p>}
			{grid && <pre>{grid.data.map(l => l.join('')).join('\n')}</pre>}
		</div>;
	}
}