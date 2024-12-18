// Adapted from https://designers.hubspot.com/blog/how-to-implement-an-animated-snow-effect-using-html5-canvas-and-javascript

import {
	createCanvas,
	Image,
} from 'canvas';
import fsp from 'fs/promises';
import sharp from 'sharp';
import {
	WIDTH,
	HEIGHT,
	FONT1,
	FONT2,
	FONT3,
} from './constants.js';

const files = await fsp.readdir('assets/originals');


for (const file of files) {
	const { name } = file.match(/(?<name>\d+).+\.(?<ext>\w+)/).groups;
	const sleeps = parseInt(name);
	const bg = await sharp(`assets/originals/${file}`)
		.resize(WIDTH, HEIGHT)
		.modulate({ brightness: 0.9 })
		.toBuffer();

	const canvas = createCanvas(WIDTH, HEIGHT);
	const ctx = canvas.getContext('2d');

	const img = new Image();
	img.onload = () => ctx.drawImage(img, 0, 0);
	img.onerror = err => {
		throw err;
	};
	img.src = bg;

	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = 'white';
	ctx.shadowOffsetX = 4;
	ctx.shadowOffsetY = 8;
	ctx.shadowColor = 'rgba(0, 0, 0, 1)';
	ctx.shadowBlur = 8;

	switch (sleeps) {
	case 0: {
		ctx.font = `72px ${FONT2}`;
		ctx.fillText('Merry Christmas', WIDTH / 2, 150);
		break;
	}
	case 1: {
		ctx.font = `144px ${FONT1}`;
		ctx.fillText(sleeps.toString(), WIDTH / 2, 96);
		ctx.font = `64px ${FONT2}`;
		ctx.fillText('sleep left', WIDTH / 2, 204);
		break;
	}
	default: {
		ctx.font = `144px ${FONT1}`;
		ctx.fillText(sleeps.toString(), WIDTH / 2, 96);
		ctx.font = `64px ${FONT2}`;
		ctx.fillText('sleeps left', WIDTH / 2, 204);
	}
	}

	ctx.font = `bold 10px ${FONT3}`;
	// ctx.fillText('aka.earth/xmas', WIDTH / 2, 384);
	ctx.fillText('christmascountdown.live', WIDTH / 2, 290);


	// if (sleeps !== 2) continue;
	await fsp.writeFile(`generated/with-text/${name}.png`, canvas.toBuffer('image/png', { compressionLevel: 0 }));
}