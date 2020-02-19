import * as Image from './Image';
import World from './World';
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
  const world = new World(height, width);

  world.visit(function (x, y, on) {
    Image.setRgb(imageData, x, y, on ? colors.on : colors.off);
  });

  context.putImageData(imageData, 0, 0);
});
