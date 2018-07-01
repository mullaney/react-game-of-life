const ALIVE = 1;
const DEAD = 0;
export const BENCHMARK_COUNTER_MAX = 1000;

export const randomGrid = size => {
  const grid = new Array(size).fill(0).map(() => Math.floor(Math.random() * 1.6));
  return grid;
};

export const livingNeighbors = (cells, shape, row, col) => {
  const firstRow  = (row === 0) ? shape[0] - 1 : row - 1;
  const lastRow   = (row === shape[0] - 1) ? 0 : row + 1;
  const firstCol  = (col === 0) ? shape[0] - 1 : col - 1;
  const lastCol   = (col === shape[0] - 1) ? 0 : col + 1;

  return cells[firstRow * shape[1] + firstCol] +
         cells[firstRow * shape[1] + col] +
         cells[firstRow * shape[1] + lastCol] +
         cells[row * shape[1] + firstCol] +
         cells[row * shape[1] + lastCol] +
         cells[lastRow * shape[1] + firstCol] +
         cells[lastRow * shape[1] + col] +
         cells[lastRow * shape[1] + lastCol];
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

    if (!isAlive && neighbors !== 3) {
      return DEAD;
    } else if (isAlive && (neighbors >= 2 && neighbors <= 3)) {
      return ALIVE;
    } else {
      return !isAlive ? ALIVE : DEAD;
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

export const incrementCounter = (count, max = BENCHMARK_COUNTER_MAX) => {
  if (count === 0) return 0;
  if (count >= max) return 0;
  return count + 1;
};

export const setLastBenchmarkElapsed = (running, counter, startTime) => {
  if (counter < BENCHMARK_COUNTER_MAX || !running || startTime === 0) {
    return 0;
  } else {
    return new Date().getTime() - startTime;
  }
};

export const shouldBeRunning = (count, running, startTime) => {
  return count > 1 || (running && startTime === 0);
};
