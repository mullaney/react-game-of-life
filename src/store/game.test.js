import reduce, {
  clearGrid,
  randomizeGrid,
  oneTick,
  togglePlay,
  CLEAR_GRID,
  RANDOMIZE_GRID,
  ONE_TICK,
  TOGGLE_PLAY
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
    describe('oneTick', () => {
      test('should create the correct action', () => {
        expect(oneTick()).toEqual({ type: ONE_TICK });
      });
    });
    describe('togglePlay', () => {
      test('should create the correct action', () => {
        expect(togglePlay()).toEqual({ type: TOGGLE_PLAY });
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

    describe('ONE_TICK should transform the grid by one tick', () => {
      test('should clear the grid', () => {
        const blinker1 = [
          0, 0, 0, 0, 0,
          0, 0, 1, 0, 0,
          0, 0, 1, 0, 0,
          0, 0, 1, 0, 0,
          0, 0, 0, 0, 0,
        ];
        const blinker2 = [
          0, 0, 0, 0, 0,
          0, 0, 0, 0, 0,
          0, 1, 1, 1, 0,
          0, 0, 0, 0, 0,
          0, 0, 0, 0, 0,
        ];
        const state1 = {
          cells: blinker1,
          other: 'property',
          rows: 5,
          cols: 5,
        };
        const state2 = {
          cells: blinker2,
          other: 'property',
          rows: 5,
          cols: 5,
        };
        expect(reduce(state1, oneTick())).toEqual(state2);
        expect(reduce(state2, oneTick())).toEqual(state1);
        expect(reduce(state1, oneTick())).toEqual(state2);
        expect(reduce(state2, oneTick())).toEqual(state1);
      });
    });

    describe('TOGGLE_PLAY should turn toggle running prop', () => {
      test('should toggle running to true', () => {
        const state = {
          running: false,
          other: 'property'
        };
        expect(reduce(state, togglePlay())).toEqual({
          running: true,
          other: 'property'
        });
      });
      test('should toggle running to false', () => {
        const state = {
          running: true,
          other: 'property'
        };
        expect(reduce(state, togglePlay())).toEqual({
          running: false,
          other: 'property'
        });
      });
    });
  });
});

