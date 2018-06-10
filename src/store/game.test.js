import reduce, {
  clearGrid,
  randomizeGrid,
  CLEAR_GRID,
  RANDOMIZE_GRID
} from './game';

describe('Game store', () => {
  describe('action creators', () => {
    describe('clearGrid', () => {
      test('should create the correct action', () => {
        expect(clearGrid()).toEqual({ type: CLEAR_GRID });
      });
    });
    describe('randomizeGrid', () => {
      test('should create the correct action', () => {
        expect(randomizeGrid()).toEqual({ type: RANDOMIZE_GRID });
      });
    });
  });

  describe('reducer', () => {
    describe('CLEAR_GRID should clear the grid', () => {
      test('should clear the grid', () => {
        const state = {
          cells: [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1],
          other: 'property'
        };
        expect(reduce(state, clearGrid())).toEqual({
          cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          other: 'property'
        });
      });
    });

    describe('RANDOMIZE_GRID should randomize the grid', () => {
      test('should clear the grid', () => {
        const state = {
          cells: new Array(100),
          other: 'property',
          rows: 10,
          cols: 10,
        };
        expect(reduce(state, randomizeGrid()).cells.length).toBe(100);
      });
    });
  });
});

