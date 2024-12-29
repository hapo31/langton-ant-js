let field = [];
let ants = [];
let steps = 0;

const root = document.getElementById("table-root");

function createTable(width = 100, height = 100) {
  field = Array.from({ length: height },
    () => Array.from({ length: width }, () => 0));
  ants = [];
  steps = 0;
  document.getElementById("steps").textContent = steps;
  root.innerHTML = "";

  let n = 0;
  for (const row of field) {
    for (const col of row) {
      const cell = document.createElement("div");
      const x = n % width;
      const y = Math.floor(n / width);
      cell.setAttribute("id", cellId(x, y));
      cell.onclick = () => spawn(x, y);
      cell.classList.add("cell");
      root.appendChild(cell);
      ++n;
    }
  }

  root.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
}

function spawn(x, y) {
  const ant = {
    x,
    y,
    dir: DIR.UP
  };

  ants.push(ant);
  const cell = document.getElementById(cellId(x, y));
  cell.classList.add("ant");
}

function step() {
  let n = 0;
  for (const ant of ants) {
    const beforeCell = document.getElementById(cellId(ant.x, ant.y));
    beforeCell.classList.remove("ant");

    if (field[ant.y][ant.x] === 0) {
      ant.dir = (ant.dir + 1) % 4;
    } else {
      ant.dir = ant.dir - 1 < 0 ? 3 : ant.dir - 1;
    }

    field[ant.y][ant.x] = field[ant.y][ant.x] === 0 ? (n + 1) : 0;

    if (field[ant.y][ant.x] > 0) {
      beforeCell.classList.add("active");
    } else {
      beforeCell.classList.remove("active");
    }

    switch (ant.dir) {
      case DIR.UP:
        ant.y -= 1;
        break;
      case DIR.RIGHT:
        ant.x += 1;
        break;
      case DIR.DOWN:
        ant.y += 1;
        break;
      case DIR.LEFT:
        ant.x -= 1;
        break;
    }

    if (ant.x < 0) ant.x = field[0].length - 1;
    if (ant.x >= field[0].length) ant.x = 0;
    if (ant.y < 0) ant.y = field.length - 1;
    if (ant.y >= field.length) ant.y = 0;

    const afterCell = document.getElementById(cellId(ant.x, ant.y));
    afterCell.classList.add("ant");
    ++n;
  }

  ++steps;
  document.getElementById("steps").textContent = steps;
}

function cellId(x, y) {
  return `cell_${x}_${y}`;
}

const DIR = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

