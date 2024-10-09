const pixelSize = 10;
const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export default class GameOfLife {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  grid: boolean[][];
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    const gridHeight = 2 + Math.floor(canvas.height / pixelSize);
    const gridWidth = 2 + Math.floor(canvas.width / pixelSize);
    this.grid = new Array(gridHeight);
    for (let i = 0; i < gridWidth; i++)
      this.grid[i] = new Array(gridWidth).fill(false);
    this.addListers();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "green";
    for (let x = 0; x < this.grid.length - 2; x++) {
      for (let y = 0; y < this.grid[x].length - 2; y++) {
        if (this.grid[x + 1][y + 1])
          this.ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }
  cycle() {
    const newGrid = new Array(this.grid.length);
    let population = 0;
    for (let x = 0; x < this.grid.length; x++) {
      newGrid[x] = new Array(this.grid.length).fill(false);
      if (x == 0 || x == this.grid.length - 1) continue;

      for (let y = 1; y < this.grid[x].length - 1; y++) {
        let count = 0;
        for (const [dx, dy] of dirs) {
          if (this.grid[x + dx][y + dy]) count += 1;
        }
        if (this.grid[x][y]) {
          if (count < 2) newGrid[x][y] = false;
          else if (count < 4) newGrid[x][y] = true;
          else newGrid[x][y] = false;
        } else if (count === 3) newGrid[x][y] = true;

        if (this.grid[x][y]) population += 1;
      }
    }

    this.grid = newGrid;
    this.draw();
  }

  addListers() {
    let mouseUp = true;
    this.canvas.addEventListener("mousedown", () => (mouseUp = false));
    this.canvas.addEventListener("mouseup", () => (mouseUp = true));
    this.canvas.addEventListener("mousemove", (e) => {
      if (mouseUp) return;
      const x = Math.floor(e.offsetX / pixelSize);
      const y = Math.floor(e.offsetY / pixelSize);
      if (x < 0 || y < 0) return;

      if (e.shiftKey) this.grid[x + 1][y + 1] = false;
      else this.grid[x + 1][y + 1] = true;
      this.draw();
    });
  }
}
