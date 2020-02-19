import './index.css';

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
      const [redIndex, greenIndex, blueIndex, alphaIndex] = getColorIndicesForCoord(x, y, width);
      const on = Math.random() > 0.2;
      imageData.data[redIndex] = on ? 255 : 0;
      imageData.data[greenIndex] = on ? 255 : 0;
      imageData.data[blueIndex] = on ? 255 : 0;
      imageData.data[alphaIndex] = 255;
    }
  }

  context.putImageData(imageData, 0, 0);
});

function getColorIndicesForCoord(x: number, y: number, width: number) {
  const red = y * (width * 4) + x * 4;
  const green = red + 1;
  const blue = red + 2;
  const alpha = red + 3;
  return [red, green, blue, alpha];
}
