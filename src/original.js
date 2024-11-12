// Adapted from https://designers.hubspot.com/blog/how-to-implement-an-animated-snow-effect-using-html5-canvas-and-javascript

import { createCanvas, loadImage } from 'canvas';
import fsp from 'fs/promises';
import GIFEncoder from 'gif-encoder-2';
import sharp from 'sharp';

const files = await fsp.readdir('with-text');

for (let file of files) {
	const W = 600;
	const H = 300;
	const canvas = createCanvas(W, H);
	const ctx = canvas.getContext('2d');
	const image = await loadImage('with-text/' + file);
	file = file.split('.');
	file.pop();
	file = file.join('.') + '.gif';
	if (!file.startsWith('11')) continue;

	// add snow
	const mp = 175; // max particles
	const particles = [];
	for (let i = 0; i < mp; i++) {
		particles.push({
			x: Math.random() * W, // x-coordinate
			y: Math.random() * H, // y-coordinate
			r: Math.random() * 2 + 1.5, // radius
			d: Math.random() * mp, // density
		});
	}

	// angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	let angle = 0;

	const FPS = 15;
	const d = 5;
	const encoder = new GIFEncoder(W, H, 'neuquant', true); // octree is 💩
	encoder.setFrameRate(FPS);
	encoder.setQuality(1);
	encoder.start();

	let f = 0;
	while (f <= FPS * d) {
		console.log(file, `f=${f}`);
		ctx.clearRect(0, 0, W, H);
		ctx.drawImage(image, 0, 0); // set the background png
		ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
		ctx.beginPath();
		for (let i = 0; i < mp; i++) {
			const p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
		}
		ctx.fill();

		// move the snowflakes
		angle += 0.01;
		for (let i = 0; i < mp; i++) {
			const p = particles[i];
			// Updating X and Y coordinates
			// We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			// Every particle has its own density which can be used to make the downward movement different for each flake
			// Lets make it more random by adding in the radius
			p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
			p.x += Math.sin(angle) * 2;

			// Sending flakes back from the top when it exits
			// Lets make it a bit more organic and let flakes enter from the left and right also.
			if (p.x > W + 5 || p.x < -5 || p.y > H) {
				if (i % 3 > 0) { // 66.67% of the flakes
					particles[i] = {
						x: Math.random() * W,
						y: -10,
						r: p.r,
						d: p.d,
					};
				} else {
					// If the flake is exitting from the right
					if (Math.sin(angle) > 0) {
						// Enter from the left
						particles[i] = {
							x: -5,
							y: Math.random() * H,
							r: p.r,
							d: p.d,
						};
					} else {
						// Enter from the right
						particles[i] = {
							x: W + 5,
							y: Math.random() * H,
							r: p.r,
							d: p.d,
						};
					}
				}
			}
		}

		encoder.addFrame(ctx);
		f++;
	}

	encoder.finish();
	const buffer = await sharp(encoder.out.getData(), { animated: true })
		.gif()
		.toBuffer();
	console.log('Writing', file);
	await fsp.writeFile('with-snow/' + file, buffer);
}