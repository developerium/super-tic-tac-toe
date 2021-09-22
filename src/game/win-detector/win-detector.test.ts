import { Chance } from 'chance';
import { WinDetector, WinnerResult } from './win-detector';
import { Pin, TileRow } from '../tile/tile';

describe('WinDetector', () => {
  const chance = Chance();

  it('it is able to detect a win', () => {
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

    expect(new WinDetector({ size: 3 }).getWinner(tiles)).toStrictEqual({
      player: players[0],
      locations: [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
    } as WinnerResult);
  });
});
