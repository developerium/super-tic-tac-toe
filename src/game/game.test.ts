import { Chance } from 'chance';
import { Game } from './game';
import { generateBySize, Pin, TileRow } from './tile/tile';

describe('Game', () => {
  const chance = Chance();

  describe('constructor', () => {
    it.each([
      {
        players: Array.from(new Array(2), () => chance.guid()),
        size: 3,
      },
      {
        players: Array.from(new Array(3), () => chance.guid()),
        size: 9,
      },
    ])(
      'can create a new game by getting the size of dimension and players',
      ({ size, players }) => {
        const newGame = new Game({ size, players });

        expect(newGame.playerCount).toBe(players.length);
        expect(newGame.nextPlayer).toBe(players[0]);

        const tiles = newGame.getTiles();

        expect(tiles.length).toBe(size);
        expect(tiles[0].length).toBe(size);
        expect(tiles).toStrictEqual(generateBySize(size));
      }
    );

    it('can create a game from custom tiles', () => {
      const players = Array.from(new Array(2), () => chance.guid());
      const size = 3;
      const customTiles = [
        [
          {
            player: players[0],
            pin: Pin.Small,
          },
          null,
          null,
        ],
        [null, null, null],
        [null, { player: players[1], pin: Pin.Small }, null],
      ];

      const newGame = new Game({ size, players, tiles: customTiles });
      const tiles = newGame.getTiles();

      expect(tiles).not.toStrictEqual(generateBySize(size));
      expect(tiles).toStrictEqual(customTiles);
    });
  });

  describe('addMove', () => {
    const players = Array.from(new Array(2), () => chance.guid());
    const size = 3;

    it('can accept a move with x, y and a pin size', () => {
      const newGame = new Game({ size, players });

      const x = 0;
      const y = 0;
      const pin = Pin.Small;
      newGame.createMove({ x, y, pin });

      expect(newGame.getTiles()[x][y]).toStrictEqual({
        player: players[0],
        pin,
      });
    });

    it('rotates next player by adding moves', () => {
      const newGame = new Game({ size, players });

      expect(newGame.nextPlayer).toBe(players[0]);

      newGame.createMove({ x: 0, y: 0, pin: Pin.Small });
      expect(newGame.nextPlayer).toBe(players[1]);

      newGame.createMove({ x: 1, y: 0, pin: Pin.Small });
      expect(newGame.nextPlayer).toBe(players[0]);

      newGame.createMove({ x: 2, y: 0, pin: Pin.Small });
      expect(newGame.nextPlayer).toBe(players[1]);
    });
  });

  describe('validate', () => {
    const players = Array.from(new Array(2), () => chance.guid());
    const size = 3;

    it('validates if a move is valid or not', () => {
      const newGame = new Game({ size, players });

      const x = 1;
      const y = 1;

      // before any move, everything is valid
      expect(newGame.validate({ x, y, pin: Pin.Small })).toBe(true);
      expect(newGame.validate({ x, y, pin: Pin.Medium })).toBe(true);
      expect(newGame.validate({ x, y, pin: Pin.Large })).toBe(true);

      // occupy
      newGame.createMove({ x, y, pin: Pin.Small });

      // small can't take small
      expect(newGame.validate({ x, y, pin: Pin.Small })).toBe(false);

      // medium can take small
      expect(newGame.validate({ x, y, pin: Pin.Medium })).toBe(true);

      // large can take small
      expect(newGame.validate({ x, y, pin: Pin.Large })).toBe(true);
    });
  });
});
