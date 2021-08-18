import { Chance } from 'chance';
import { Game } from './game';
import { Pin } from './tile/tile';

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
      }
    );
  });

  describe('addMove', () => {
    const players = Array.from(new Array(2), () => chance.guid());
    const size = 3;

    it('can accept a move with x, y and a pin size', () => {
      const newGame = new Game({ size, players });

      const x = 0;
      const y = 0;
      const pin = Pin.Small;
      newGame.addMove({ x, y, pin });

      expect(newGame.nextPlayer).toBe(players[0]);
      expect(newGame.getTiles()[x][y]).toStrictEqual({
        player: players[0],
        pin,
      });
    });
  });
});
