import './index.css';

window.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas')!;

  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }

  const context = canvas.getContext('2d')!;
  const { height, width } = canvas.getBoundingClientRect();

  const size = height * width;
  const imageData = context.createImageData(width, height);

  for (let index = 0; index < size; index += 1) {
    imageData.data[index] = Math.random() > 0.2 ? 255 : 0;
  }

  context.putImageData(imageData, 0, 0);
});
