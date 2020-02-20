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
      const { x, y } = this.getCoordFromIndex(i);
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

  private getCoordFromIndex(index: number): { x: number, y: number } {
    const x = index % this.width;
    const y = Math.floor(index / this.width);
    return { x, y };
  }

  private getIndexForCoord(x: number, y: number): number {
    return x + this.width * y;
  }

  private countNeighbors(x: number, y: number): number {
    const neighbors = this.getNeighbors(x, y);
    return neighbors.reduce((acc, on) => (on ? acc + 1 : acc), 0);
  }

  private getNeighbors(x: number, y: number): boolean[] {
    return [
      this.storage[this.getIndexForCoord(x - 1, y + 1)],
      this.storage[this.getIndexForCoord(x, y + 1)],
      this.storage[this.getIndexForCoord(x + 1, y + 1)],
      this.storage[this.getIndexForCoord(x - 1, y)],
      this.storage[this.getIndexForCoord(x + 1, y)],
      this.storage[this.getIndexForCoord(x - 1, y - 1)],
      this.storage[this.getIndexForCoord(x, y - 1)],
      this.storage[this.getIndexForCoord(x + 1, y - 1)],
    ];
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
