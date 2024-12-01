# countdown-images

25 images for the [Christmas Countdown bot for Discord](https://github.com/christmas-countdown/bot) with animated snow.

## Background image sources

- [ChristmasHQ](https://christmashq.com/designs/backgrounds/)
- [Pexels](https://www.pexels.com/)
- [Unsplash](https://unsplash.com/)

### Dev notes

[could have been done with canvas?](https://blog.logrocket.com/processing-images-sharp-node-js/#adding-text-to-an-image)


```sh
rclone mount :memory: Z:
```


```sh
ffmpeg -i generated/frames/00-%03d.webp -framerate 19 -loop 0 generated/with-snow/00-animated.webp
```