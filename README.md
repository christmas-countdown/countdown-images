# countdown-images

25 images for the [Christmas Countdown bot for Discord](https://github.com/christmas-countdown/bot) with animated snow.

## Background image sources

- [ChristmasHQ](https://christmashq.com/designs/backgrounds/)
- [Pexels](https://www.pexels.com/)
- [Unsplash](https://unsplash.com/)

### Dev notes

- could have been done without canvas?
- https://blog.logrocket.com/processing-images-sharp-node-js/#adding-text-to-an-image
- https://www.digitalocean.com/community/tutorials/how-to-process-images-in-node-js-with-sharp#step-7-adding-text-on-an-image

- https://github.com/lovell/sharp/issues/3236
- https://github.com/lovell/sharp/issues/1580
- apng input only used first frame
- https://github.com/lovell/sharp/issues/2375
- https://github.com/52poke/malasada/issues/1

```sh
rclone mount :memory: Z:
```

https://ffmpeg.org/ffmpeg-all.html#Options-38 

```sh
ffmpeg -i generated/frames/00-%03d.webp -framerate 19 -loop 0 generated/with-snow/00-animated.webp
```

```sh
ffmpeg -i n-animated.png -framerate 19 -loop 0 -preset photo -quality 50 -compression_level 6 n-animated.webp
```