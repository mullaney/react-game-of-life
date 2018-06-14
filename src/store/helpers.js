const ALIVE = 1;
const DEAD = 0;

export const randomGrid = size => {
  const grid = new Array(size).fill(0).map(() => Math.floor(Math.random() * 1.6));
  return grid;
};

export const livingNeighbors = (cells, shape, row, col) => {

  let neighbors = 0;
  for (let x = row - 1; x <= row + 1; x++) {
    for (let y = col - 1; y <= col + 1; y++) {
      if (x === row && y === col) continue;

      let thisRow = (x < 0) ? x + shape[0] : x % shape[0];
      let thisCol = (y < 0) ? y + shape[0] : y % shape[1];

      if (cells[thisRow * shape[1] + thisCol] === 1) neighbors++;
    }
  }
  return neighbors;
};

export const tick = (cells, shape) => {
  const newCells = cells.map((cell, index) => {
    const neighbors = livingNeighbors(
      cells,
      shape,
      Math.floor(index / shape[1]),
      index % shape[1]
    );
    const isAlive = !!cell;

    if (isAlive && (neighbors < 2 || neighbors > 3)) {
      return DEAD;
    } else if (!isAlive && neighbors === 3) {
      return ALIVE;
    } else {
      return isAlive ? ALIVE : DEAD;
    }
  });

  return newCells;
};

export const gridWidth = size => size * (Math.floor(500 / size) + 1) + 1;

export const optimalGridSize = size => {
  const cellSize = Math.floor(500 / size);
  const width = gridWidth(size);
  return cellSize - Math.floor(width / 542);
};

