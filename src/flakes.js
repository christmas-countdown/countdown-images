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
		radius: Math.random() * 2 + 1.5,
		density: Math.max(FLAKES / 2, Math.random() * FLAKES),
	});
}

// angle will be an ongoing incremental flag.
// Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes

for (let frame = 0, angle = 0; frame <= FRAMES; frame++, angle += 0.01) {
	for (let flake = 0; flake < FLAKES; flake++) {
		const p = particles[flake];
		// Updating X and Y coordinates
		// We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
		// Every particle has its own density which can be used to make the downward movement different for each flake
		// Lets make it more random by adding in the radius
		const pos = {
			x: p.positions[p.positions.length - 1].x + ((Math.cos(angle + p.density) + p.radius) / 3),
			// y: p.positions[p.positions.length - 1].y + (Math.sin(angle) * 2),
			y: p.positions[p.positions.length - 1].y + ((HEIGHT / FRAMES) + (0.01 * p.density)),
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