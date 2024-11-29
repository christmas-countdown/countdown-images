// Adapted from https://designers.hubspot.com/blog/how-to-implement-an-animated-snow-effect-using-html5-canvas-and-javascript

import {
	WIDTH,
	HEIGHT,
	FRAMES,
	FLAKES,
} from './constants.js';
import { writeFileSync } from 'node:fs';

const particles = [];
for (let p = 0; p < FLAKES; p++) {
	particles.push({
		positions: [
			{
				x: (Math.random() * (WIDTH + 50)) - 100,
				y: 0,
			},
		],
		radius: Math.random() * 1.75 + 1,
		density: Math.max(FLAKES / 2, Math.random() * FLAKES),
	});
}


for (let frame = 0, angle = 0; frame <= FRAMES; frame++, angle += 0.01) {
	for (let flake = 0; flake < FLAKES; flake++) {
		const p = particles[flake];
		const pos = {
			x: p.positions[p.positions.length - 1].x + Math.abs((Math.cos(angle + p.density) + (3 - (p.radius / 2))) / 2),
			// y: p.positions[p.positions.length - 1].y + (Math.sin(angle) * 2),
			// y: p.positions[p.positions.length - 1].y + ((HEIGHT / FRAMES) + (0.01 * p.density)),
			y: p.positions[p.positions.length - 1].y + ((HEIGHT / FRAMES) + (0.5 * p.radius)),
		};

		// if (pos.y < HEIGHT + 5) {
		p.positions.push(pos);
		// }

	}
}

for (const p of particles) {
	const i = Math.floor(Math.random() * p.positions.length);
	p.positions = p.positions.slice(i).concat(p.positions.slice(0, i));
}

writeFileSync('flakes.json', JSON.stringify(particles));