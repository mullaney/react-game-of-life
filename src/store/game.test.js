import reduce, {
  clearGrid,
  randomizeGrid,
  oneTick,
  togglePlay,
  changeGridSize,
  startBenchmarkTest,
  CLEAR_GRID,
  RANDOMIZE_GRID,
  ONE_TICK,
  TOGGLE_PLAY,
  CHANGE_GRID_SIZE,
  START_BENCHMARK_TEST
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
    describe('changeGridSize', () => {
      test('should change the grid size', () => {
        expect(changeGridSize(80)).toEqual({ type: CHANGE_GRID_SIZE, size: 80 });
      });
    });
    describe('startBenchmarkTest', () => {
      test('should create the correct action', () => {
        expect(startBenchmarkTest()).toEqual({ type: START_BENCHMARK_TEST });
      });
    });
  });

  describe('reducer', () => {
    describe('CLEAR_GRID should clear the grid', () => {
      test('should clear the grid', () => {
        const state = {
          cells: [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1],
          other: 'property',
          running: true
        };
        expect(reduce(state, clearGrid())).toEqual({
          cells: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          other: 'property',
          running: false
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
      test('should transform the grid by one tic', () => {
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
        const newState1 = reduce(state1, oneTick());
        expect(newState1.cells).toEqual(state2.cells);
        const newState2 = reduce(newState1, oneTick());
        expect(newState2.cells).toEqual(state1.cells);
      });
      test('if benchmark running, should increase the benchmark counter', () => {
        const state = {
          rows: 5,
          cols: 5,
          cells: blinker1,
          benchmarkCounter: 1,
          other: 'property'
        };
        const newState = reduce(state, oneTick());
        expect(newState.benchmarkCounter).toBe(2);
        expect(newState.other).toBe('property');
      });
      test('if benchmark counter exceeds 1000, stop running', () => {
        const state = {
          rows: 5,
          cols: 5,
          cells: blinker1,
          benchmarkCounter: 1000,
          running: true,
          other: 'property'
        };
        const newState = reduce(state, oneTick());
        expect(newState.running).toBe(false);
        expect(newState.benchmarkCounter).toBe(0);
      });
    });

    describe('TOGGLE_PLAY', () => {
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

    describe('CHANGE_GRID_SIZE', () => {
      test('should set the correct row, height and size, when changing size of grid', () => {
        const state = {
          rows: 5,
          cols: 5,
          size: '77px',
          cells: []
        };

        let newState = reduce(state, changeGridSize(20));
        expect(newState.rows).toBe(20);
        expect(newState.cols).toBe(20);
        expect(newState.size).toBe('25px');
        expect(newState.cells.length).toBe(400);

        newState = reduce(state, changeGridSize(30));
        expect(newState.rows).toBe(30);
        expect(newState.size).toBe('16px');

        newState = reduce(state, changeGridSize(40));
        expect(newState.rows).toBe(40);
        expect(newState.size).toBe('12px');

        newState = reduce(state, changeGridSize(50));
        expect(newState.rows).toBe(50);
        expect(newState.size).toBe('9px');

        newState = reduce(state, changeGridSize(60));
        expect(newState.rows).toBe(60);
        expect(newState.size).toBe('8px');

        newState = reduce(state, changeGridSize(70));
        expect(newState.rows).toBe(70);
        expect(newState.size).toBe('6px');

        newState = reduce(state, changeGridSize(80));
        expect(newState.rows).toBe(80);
        expect(newState.size).toBe('5px');

        newState = reduce(state, changeGridSize(90));
        expect(newState.rows).toBe(90);
        expect(newState.size).toBe('5px');

        newState = reduce(state, changeGridSize(100));
        expect(newState.rows).toBe(100);
        expect(newState.size).toBe('4px');
      });
      test('should set running to false', () => {
        const state = {
          rows: 5,
          cols: 5,
          size: '77px',
          cells: [],
          running: true,
        };

        let newState = reduce(state, changeGridSize(20));
        expect(newState.running).toBe(false);
      });
    });

    describe('START_BENCHMARK_TEST', () => {
      test('should set set benchmark counter to 1', () => {
        const state = {
          other: 'property',
          benchmarkCounter: 0
        };

        let newState = reduce(state, startBenchmarkTest());
        expect(newState.other).toBe('property');
        expect(newState.benchmarkCounter).toBe(1);
      });

      test('should set set benchmark start time to a timestamp', () => {
        const state = {
          other: 'property',
          benchmarkStartTime: 0
        };
        const now = new Date().getTime();

        let newState = reduce(state, startBenchmarkTest());
        expect(newState.other).toBe('property');
        expect(newState.benchmarkStartTime).toBeGreaterThanOrEqual(now);
        expect(newState.benchmarkStartTime).toBeLessThan(now + 5);
      });
    });
  });
});

