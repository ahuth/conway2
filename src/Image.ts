/* eslint-disable no-param-reassign */

const masks = {
  red: 0xFF0000,
  green: 0x00FF00,
  blue: 0x0000FF,
};

export function setRgb(imageData: ImageData, x: number, y: number, color: number) {
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
