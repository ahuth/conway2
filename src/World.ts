export default class World {
  height: number;
  width: number;
  storage: boolean[];

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
    this.storage = new Array(height * width).fill(false);
    this.randomize();
  }

  randomize(): void {
    for (let i = 0; i < this.storage.length; i += 1) {
      this.storage[i] = Math.random() > 0.2;
    }
  }

  visit(callback: (x: number, y: number, value: boolean) => void): void {
    for (let i = 0; i < this.storage.length; i += 1) {
      const { x, y } = this.getCoordFromIndex(i);
      callback(x, y, this.storage[i]);
    }
  }

  private getCoordFromIndex(index: number): { x: number, y: number } {
    const x = index % this.width;
    const y = Math.floor(index / this.width);
    return { x, y };
  }
}
