import {
  randomGrid,
  tick,
  optimalGridSize,
  incrementCounter,
  setLastBenchmarkElapsed,
  // BENCHMARK_COUNTER_MAX
} from './helpers';

const DEFAULT_SIZE = 40;

export const CLEAR_GRID = 'CLEAR_GRID';
export const RANDOMIZE_GRID = 'RANDOMIZE_GRID';
export const ONE_TICK = 'ONE_TICK';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const CHANGE_GRID_SIZE = 'CHANGE_GRID_SIZE';
export const START_BENCHMARK_TEST = 'START_BENCHMARK_TEST';

export const initialState = {
  cells: new Array(DEFAULT_SIZE * DEFAULT_SIZE).fill(0),
  rows: DEFAULT_SIZE,
  cols: DEFAULT_SIZE,
  running: false,
  size: '12px',
  benchmarkCounter: 0,
  benchmarkStartTime: 0,
  lastBenchmarkElapsed: 0
};

// Action Creators

export const clearGrid = () => ({ type: CLEAR_GRID });
export const randomizeGrid = () => ({ type: RANDOMIZE_GRID });
export const oneTick = () => ({ type: ONE_TICK });
export const togglePlay = () => ({ type: TOGGLE_PLAY });
export const changeGridSize = size => ({ type: CHANGE_GRID_SIZE, size });
export const startBenchmarkTest = () => ({ type: START_BENCHMARK_TEST });

// Reducer

export default function (state = initialState, action) {
  const {rows, cols, cells, running} = state;
  let benchmarkCounter = 0;
  let shouldBeRunning = false;

  switch (action.type) {
    case START_BENCHMARK_TEST:
      return {
        ...state,
        benchmarkCounter: 1,
        benchmarkStartTime: new Date().getTime(),
        running: true
      };

    case CHANGE_GRID_SIZE:
      return {
        ...state,
        rows: action.size,
        cols: action.size,
        size: `${optimalGridSize(action.size)}px`,
        cells: new Array(action.size * action.size).fill(0),
        running: false
      };

    case TOGGLE_PLAY:
      return {...state, running: !running };

    case ONE_TICK:
      benchmarkCounter = incrementCounter(state.benchmarkCounter);
      shouldBeRunning = (running && state.benchmarkStartTime === 0) || benchmarkCounter > 1;
      return {
        ...state,
        cells: tick(cells, [rows, cols]),
        benchmarkCounter: benchmarkCounter,
        running: shouldBeRunning,
        lastBenchmarkElapsed: setLastBenchmarkElapsed(state.running, state.benchmarkCounter, state.benchmarkStartTime)
      };

    case CLEAR_GRID:
      return {...state, cells: cells.fill(0), running: false };

    case RANDOMIZE_GRID:
      return {...state, cells: randomGrid(rows * cols)};

    default:
      return state;
  }
}

