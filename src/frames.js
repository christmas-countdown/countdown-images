// Adapted from https://designers.hubspot.com/blog/how-to-implement-an-animated-snow-effect-using-html5-canvas-and-javascript

import { createCanvas, loadImage } from 'canvas';
import sharp from 'sharp';
// import GIF from 'sharp-gif2';
import fs from 'fs';
import fsp from 'fs/promises';
import { Readable } from 'stream';
import {
	WIDTH,
	HEIGHT,
	FLAKES,
	FRAMES,
} from './constants.js';

const files = await fsp.readdir('generated/with-text');

for (const file of files) {
	const name = file.split('.')[0];
	const sleeps = parseInt(name);
	if (sleeps !== 11) continue;

	const canvas = createCanvas(WIDTH, HEIGHT);
	const ctx = canvas.getContext('2d');
	const image = await loadImage(`generated/with-text/${file}`);

	const particles = [];
	for (let p = 0; p < FLAKES; p++) {
		particles.push({
			positions: [
				{
					x: (Math.random() * (WIDTH + 50)) - 100,
					y: 0,
				},
			],
			radius: Math.random() * 2 + 1,
			density: Math.max(FLAKES / 2, Math.random() * FLAKES),
		});
	}


	for (let frame = 0, angle = 0; frame < FRAMES; frame++, angle += 0.01) {
		for (let flake = 0; flake < FLAKES; flake++) {
			const p = particles[flake];
			const pos = {
				x: p.positions[p.positions.length - 1].x + Math.abs((Math.cos(angle + p.density) + (3 - (p.radius / 2))) / 2),
				y: p.positions[p.positions.length - 1].y + ((HEIGHT / FRAMES) + (0.5 * p.radius)),
			};
			p.positions.push(pos);
		}
	}

	for (const p of particles) {
		const i = Math.floor(Math.random() * p.positions.length);
		p.positions = p.positions.slice(i).concat(p.positions.slice(0, i));
	}

	// const gif = GIF.createGif({
	// 	width: WIDTH,
	// 	height: HEIGHT,

	// });

	for (let f = 0; f < FRAMES; f++) {
		console.log(name, `f=${f}`);
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		ctx.drawImage(image, 0, 0); // set the background png
		ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
		ctx.beginPath();
		for (const flake of particles) {
			const pos = flake.positions[f];
			if (!pos) continue;
			ctx.moveTo(pos.x, pos.y);
			ctx.arc(pos.x, pos.y, flake.radius, 0, Math.PI * 2, true);
		}
		ctx.fill();
		// gif.addFrame(canvas.toBuffer());
		Readable
			.from(
				await sharp(canvas.toBuffer())
					// .toColorspace('yuv')
					.webp({ lossless: true })
					.toBuffer(),
			)
			.pipe(
				// fs.createWriteStream(`Z://${sleeps.toString().padStart(2, '0')}-${f.toString().padStart(3, '0')}.webp`),
				fs.createWriteStream(`generated/frames/${sleeps.toString().padStart(2, '0')}-${f.toString().padStart(3, '0')}.webp`),
			);
	}


}