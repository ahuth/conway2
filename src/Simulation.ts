import World from './World';
import * as Image from './Image';

const colors = {
  on: 0xFFFFFF,
  off: 0x000000,
};

export default class Simulation {
  context: CanvasRenderingContext2D;
  imageData: ImageData;
  world: World;

  constructor(context: CanvasRenderingContext2D, height: number, width: number) {
    this.context = context;
    this.imageData = context.createImageData(width, height);
    this.world = new World(height, width);
  }

  randomize() {
    this.world.randomize();
    this.draw();
  }

  step() {
    this.world.step();
    this.draw();
  }

  private draw() {
    this.world.visit((x, y, on) => {
      Image.setRgb(this.imageData, x, y, on ? colors.on : colors.off);
    });

    this.context.putImageData(this.imageData, 0, 0);
  }
}
