import * as Image from './Image';
import './index.css';

const colors = {
  on: 0xFFFFFF,
  off: 0x000000,
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
      Image.setRgb(imageData, x, y, color);
    }
  }

  context.putImageData(imageData, 0, 0);
});
