
const DEFAULT_SIZE = 60;

const randomGrid = size => {
  const grid = new Array(size).fill(0).map(() => Math.floor(Math.random() * 1.6));
  return grid;
};

export const CLEAR_GRID = 'CLEAR_GRID';
export const RANDOMIZE_GRID = 'RANDOMIZE_GRID';

export const initialState = {
  cells: new Array(DEFAULT_SIZE * DEFAULT_SIZE).fill(0),
  rows: DEFAULT_SIZE,
  cols: DEFAULT_SIZE
};

// Action Creators

export const clearGrid = () => (
  {
    type: CLEAR_GRID,
  }
);

export const randomizeGrid = () => (
  {
    type: RANDOMIZE_GRID,
  }
);

// Reducer

export default function (state = initialState, action) {

  switch (action.type) {

    case CLEAR_GRID:
      return {...state, cells: [...state.cells].fill(0)};

    case RANDOMIZE_GRID:
      return {...state, cells: randomGrid(state.rows * state.cols)};

    default:
      return state;
  }
}
