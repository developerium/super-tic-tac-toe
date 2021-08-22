import { Chance } from 'chance';
import { generateBySize, getWinner, Pin, TileRow, WinnerResult } from './tile';

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

describe('getWinner', () => {
  const chance = Chance();

  it('getWinnerHorizontally', () => {
    const players = Array.from(new Array(2), () => chance.guid());
    const tiles = [
      [{ player: players[1], pin: Pin.Medium }, null, null],
      [
        { player: players[0], pin: Pin.Medium },
        { player: players[0], pin: Pin.Small },
        { player: players[0], pin: Pin.Large },
      ],
      [null, null, { player: players[1], pin: Pin.Medium }],
    ] as TileRow[];

    expect(getWinner(tiles)).toStrictEqual({
      player: players[0],
      locations: [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
    } as WinnerResult);
  });
});
