// import React from 'react';
import Solver from './Solver';

class Coord3D {
	constructor(x, y, z) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}

	length() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}

	collision(other) {
		return this.x === other.x && this.y === other.y && this.z === other.z;
	}
}

class Particle {
	static fromString(txt) {
		let p = new Particle();
		let match = txt.match(/^p=<([-,0-9]*)>, v=<([-,0-9]*)>, a=<([-,0-9]*)>$/);
		p.pos = new Coord3D(...match[1].split(',').map(n => parseInt(n, 10)));
		p.vel = new Coord3D(...match[2].split(',').map(n => parseInt(n, 10)));
		p.acc = new Coord3D(...match[3].split(',').map(n => parseInt(n, 10)));
		return p;
	}

	tick() {
		this.vel.x += this.acc.x;
		this.vel.y += this.acc.y;
		this.vel.z += this.acc.z;
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		this.pos.z += this.vel.z;
	}
}

export class S20a extends Solver {
	solve(input) {
		let particles = input.split('\n').map(l => Particle.fromString(l));
		let slow = 0, spd = particles[0].acc.length();
		for (let i = 1; i < particles.length; i++) {
			let s = particles[i].acc.length();
			if (s < spd) {
				spd = s;
				slow = i;
			}
		}
		let part = particles;
		for (let i = 0; i < 50; i++) {
			let next = part;
			next.forEach(p => p.tick());
			part = part.filter(p => next.filter(q => q.pos.collision(p.pos)).length === 1);
		}
		this.setState({ solution: `Particles: ${particles.length}\nSlowest particle: #${slow}\nRemaining particles: ${part.length}` });
	}
}

export class S20b extends Solver {
}