// Adapted from https://designers.hubspot.com/blog/how-to-implement-an-animated-snow-effect-using-html5-canvas-and-javascript

import { createCanvas, loadImage } from 'canvas';
import fsp from 'fs/promises';
import GIFEncoder from 'gif-encoder-2';
import sharp from 'sharp';
import {
	WIDTH,
	HEIGHT,
	FRAMES,
	FPS,
} from './constants.js';

const files = await fsp.readdir('with-text');
const particles = JSON.parse(await fsp.readFile('flakes.json'));

for (let file of files) {
	const canvas = createCanvas(WIDTH, HEIGHT);
	const ctx = canvas.getContext('2d');
	const image = await loadImage('with-text/' + file);
	file = file.split('.');
	file.pop();
	file = file.join('.') + '.gif';
	if (!file.startsWith('11')) continue;

	const encoder = new GIFEncoder(WIDTH, HEIGHT, 'neuquant', true); // octree is 💩
	encoder.setFrameRate(FPS);
	encoder.setQuality(1);
	encoder.start();

	let f = 0;
	while (f <= FRAMES) {
		// console.log(file, `f=${f}`);
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		// ctx.drawImage(image, 0, 0); // set the background png
		ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
		ctx.beginPath();
		for (const flake of particles) {
			const pos = flake.positions[f];
			if (!pos) continue;
			ctx.moveTo(pos.x, pos.y);
			ctx.arc(pos.x, pos.y, flake.radius, 0, Math.PI * 2, true);
		}

		ctx.fill();


		encoder.addFrame(ctx);
		f++;
	}

	encoder.finish();
	const buffer = await sharp(encoder.out.getData(), { animated: true })
		.gif()
		.toBuffer();
	console.log('Writing', file);
	// await fsp.writeFile('with-snow/' + file, buffer);
	await fsp.writeFile('test/' + file, buffer);
}