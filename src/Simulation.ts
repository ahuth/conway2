import World from './World';
import * as Image from './Image';

const colors = {
  on: 0xFFFFFF,
  off: 0x000000,
};

export default class Simulation {
  context: CanvasRenderingContext2D;
  height: number;
  width: number;
  world: World;

  constructor(context: CanvasRenderingContext2D, height: number, width: number) {
    this.context = context;
    this.height = height;
    this.width = width;
    this.world = new World(height, width);
  }

  randomize() {
    const imageData = this.context.createImageData(this.width, this.height);
    this.world.randomize();

    this.world.visit(function (x, y, on) {
      Image.setRgb(imageData, x, y, on ? colors.on : colors.off);
    });

    this.context.putImageData(imageData, 0, 0);
  }
}
