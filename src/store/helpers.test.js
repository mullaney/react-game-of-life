import {randomGrid, livingNeighbors, tick} from './helpers';

describe('randomGrid', () => {
  it('should return a grid of the correct size', () => {
    expect(randomGrid(10).length).toBe(10);
  });
});

describe('livingNeighbors', () => {
  it('should count the proper number of living neighbors', () => {
    const cells = [
      1, 1, 0, 0,
      1, 0, 1, 0,
      1, 1, 1, 0,
      0, 0, 0, 1
    ];
    const shape = [4, 4];

    expect(livingNeighbors(cells, shape, 0, 0)).toBe(3);
    expect(livingNeighbors(cells, shape, 0, 1)).toBe(3);
    expect(livingNeighbors(cells, shape, 0, 2)).toBe(3);
    expect(livingNeighbors(cells, shape, 0, 3)).toBe(4);
    expect(livingNeighbors(cells, shape, 1, 0)).toBe(4);
    expect(livingNeighbors(cells, shape, 1, 1)).toBe(7);
    expect(livingNeighbors(cells, shape, 1, 2)).toBe(3);
    expect(livingNeighbors(cells, shape, 1, 3)).toBe(5);
    expect(livingNeighbors(cells, shape, 2, 0)).toBe(3);
    expect(livingNeighbors(cells, shape, 2, 1)).toBe(4);
    expect(livingNeighbors(cells, shape, 2, 2)).toBe(3);
    expect(livingNeighbors(cells, shape, 2, 3)).toBe(5);
    expect(livingNeighbors(cells, shape, 3, 0)).toBe(5);
    expect(livingNeighbors(cells, shape, 3, 1)).toBe(5);
    expect(livingNeighbors(cells, shape, 3, 2)).toBe(4);
    expect(livingNeighbors(cells, shape, 3, 3)).toBe(3);
  });
});

describe('tick', () => {
  it('advances a blinker from gen1 to gen2', function() {
    const shape = [5, 5];
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

    expect(tick(blinker1, shape)).toEqual(blinker2);
    expect(tick(blinker2, shape)).toEqual(blinker1);
  });

  it('advances a glider from gen1 to gen2', function() {
    const shape = [5, 5];
    const glider1 = [
      0, 0, 0, 0, 0,
      0, 1, 0, 1, 0,
      0, 0, 1, 1, 0,
      0, 0, 1, 0, 0,
      0, 0, 0, 0, 0
    ];

    const glider2 = [
      0, 0, 0, 0, 0,
      0, 0, 0, 1, 0,
      0, 1, 0, 1, 0,
      0, 0, 1, 1, 0,
      0, 0, 0, 0, 0
    ];

    expect(tick(glider1, shape)).toEqual(glider2);

  });
});
