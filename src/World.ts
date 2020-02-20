export default class World {
  height: number;
  width: number;
  storage: boolean[];
  buffer: boolean[];

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
    this.storage = new Array(height * width).fill(false);
    this.buffer = Array.from(this.storage);
  }

  randomize(): void {
    for (let i = 0; i < this.storage.length; i += 1) {
      this.storage[i] = Math.random() > 0.2;
    }
  }

  visit(callback: (x: number, y: number, value: boolean, index: number) => void): void {
    for (let i = 0; i < this.storage.length; i += 1) {
      const x = this.getXFromIndex(i);
      const y = this.getYFromIndex(i);
      callback(x, y, this.storage[i], i);
    }
  }

  step(): void {
    this.visit((x, y, on, index) => {
      const numNeighbors = this.countNeighbors(x, y);
      this.buffer[index] = shouldTurnOn(numNeighbors, on);
    });

    this.storage = this.buffer;
  }

  private getXFromIndex(index: number): number {
    return index % this.width;
  }

  private getYFromIndex(index: number): number {
    return Math.floor(index / this.width);
  }

  private getIndexForCoord(x: number, y: number): number {
    return x + this.width * y;
  }

  private countNeighbors(x: number, y: number): number {
    let count = 0;

    count += this.storage[this.getIndexForCoord(x - 1, y + 1)] ? 1 : 0;
    count += this.storage[this.getIndexForCoord(x, y + 1)] ? 1 : 0;
    count += this.storage[this.getIndexForCoord(x + 1, y + 1)] ? 1 : 0;
    count += this.storage[this.getIndexForCoord(x - 1, y)] ? 1 : 0;
    count += this.storage[this.getIndexForCoord(x + 1, y)] ? 1 : 0;
    count += this.storage[this.getIndexForCoord(x - 1, y - 1)] ? 1 : 0;
    count += this.storage[this.getIndexForCoord(x, y - 1)] ? 1 : 0;
    count += this.storage[this.getIndexForCoord(x + 1, y - 1)] ? 1 : 0;

    return count;
  }
}

function shouldTurnOn(numNeighbors: number, on: boolean): boolean {
  switch (numNeighbors) {
    case 3:
      return true;
    case 2:
      return on;
    default:
      return false;
  }
}
