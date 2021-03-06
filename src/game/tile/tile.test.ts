import { generateBySize, getWinningMoves, LocationSet } from './tile';

describe('Tile', () => {
  describe('generateBySize', () => {
    it('can generate a 3x3 empty array', () => {
      expect(generateBySize(3)).toStrictEqual([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]);
    });

    it('can generate a 5x5 empty array', () => {
      expect(generateBySize(5)).toStrictEqual([
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
      ]);
    });

    it('can generate a 10x10 empty array', () => {
      expect(generateBySize(10)).toStrictEqual([
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
      ]);
    });
  });
});

describe('getWinningMoves', () => {
  const winningMoves: LocationSet[] = getWinningMoves(3);

  it('can generate horizontal winning moves', () => {
    const horizontalSet1: LocationSet = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ];
    const horizontalSet2: LocationSet = [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ];
    const horizontalSet3 = [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ];

    expect(winningMoves).toContainEqual(horizontalSet1);
    expect(winningMoves).toContainEqual(horizontalSet2);
    expect(winningMoves).toContainEqual(horizontalSet3);
  });

  it('can generate vertical winning moves', () => {
    const verticalSet1: LocationSet = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ];
    const verticalSet2: LocationSet = [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ];
    const verticalSet3 = [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ];

    expect(winningMoves).toContainEqual(verticalSet1);
    expect(winningMoves).toContainEqual(verticalSet2);
    expect(winningMoves).toContainEqual(verticalSet3);
  });

  it('can generate cross winning moves', () => {
    const diameterSet1: LocationSet = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    const diameterSet2: LocationSet = [
      { x: 0, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
    ];

    expect(winningMoves).toContainEqual(diameterSet1);
    expect(winningMoves).toContainEqual(diameterSet2);
  });
});
