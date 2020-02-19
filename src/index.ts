/* eslint-disable no-param-reassign */
import './index.css';

const colors = {
  on: 0xFFFFFF,
  off: 0x000000,
};

const masks = {
  red: 0xFF0000,
  green: 0x00FF00,
  blue: 0x0000FF,
};

window.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas')!;

  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }

  const context = canvas.getContext('2d')!;
  const { height, width } = canvas.getBoundingClientRect();
  const imageData = context.createImageData(width, height);

  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      const on = Math.random() > 0.2;
      const color = on ? colors.on : colors.off;
      setRgb(imageData, x, y, color);
    }
  }

  context.putImageData(imageData, 0, 0);
});

function setRgb(imageData: ImageData, x: number, y: number, color: number) {
  const [
    redIndex,
    greenIndex,
    blueIndex,
    alphaIndex,
  ] = getColorIndicesForCoord(x, y, imageData.width);

  imageData.data[redIndex] = color & masks.red;
  imageData.data[greenIndex] = color & masks.green;
  imageData.data[blueIndex] = color & masks.blue;
  imageData.data[alphaIndex] = 255;
}

function getColorIndicesForCoord(x: number, y: number, width: number) {
  const red = y * (width * 4) + x * 4;
  const green = red + 1;
  const blue = red + 2;
  const alpha = red + 3;
  return [red, green, blue, alpha];
}
