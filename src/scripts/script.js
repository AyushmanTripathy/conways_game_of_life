let blockSize = 10;
const frameRate = 100;
let main = [];
let canvas, ctx, intervalId;

//canvas-container

function startGame(size) {
  //create the canvas
  const ele = document.createElement("canvas");
  ele.height = 600;
  ele.width = 600;

  document.querySelector("#canvas-container").appendChild(ele);

  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  init(size, makeMap(size, false));
}

function init(size, map) {
  blockSize = canvas.width / size;

  main = map;
  intervalId = setInterval(() => {
    draw(main);
    main = gameLoop([...main]);

    mapEmpty(main);
  }, frameRate);
}

//loop
function gameLoop(sec) {
  //compute sec based on main

  for (let i = 0; i < main.length; i++) {
    for (let j = 0; j < main.length; j++) {
      const neighbors = countLiveNeighbors(i, j);
      const state = main[i][j];

      //rule 1 (alive if 3 alive neighbor)
      if (state == 0 && neighbors == 3) {
        sec[i][j] = 1;
      }

      //rule 2 & 3 (die if under || over populated)
      else if ((state == 1 && neighbors < 2) || neighbors > 3) {
        sec[i][j] = 0;
      } else if ((state == 1 && neighbors < 2) || neighbors > 3) {
        sec[i][j] = 0;
      }
    }
  }

  draw(sec);
  return sec;
}

function countLiveNeighbors(i, j) {
  let count = 0;

  if (i == 0 || i == main.length - 1) return 0;
  if (j == 0 || j == main.length - 1) return 0;

  //left & right & top & bottom
  count += main[i][j - 1];
  count += main[i][j + 1];
  count += main[i - 1][j];
  count += main[i + 1][j];

  //corners
  count += main[i - 1][j - 1];
  count += main[i - 1][j + 1];

  count += main[i + 1][j - 1];
  count += main[i + 1][j + 1];

  return count;
}

function mapEmpty(map) {
  for (let i = 0; i < map.length; i++) {
    if (map[i].includes(1)) return false;
  }
  return stop();
}

function draw(map) {
  //reseting
  ctx.fillStyle = "#202124";
  ctx.fillRect(0, 0, canvas.height, canvas.width);

  let x = -1,
    y = -1;
  map.forEach((row) => {
    x++;
    row.forEach((cell) => {
      y++;
      ctx.fillStyle = cell ? "#bbb" : "#202124";
      ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    });
    y = -1;
  });
}

function stop() {
  clearInterval(intervalId);
}

function makeMap(side, def) {
  let arr = new Array(side);
  let rows;

  for (let i = 0; i < side; i++) {
    rows = new Array(side);
    for (let j = 0; j < side; j++) {
      rows[j] = Math.round(Math.random());
    }
    arr[i] = rows;
  }

  return arr;
}
