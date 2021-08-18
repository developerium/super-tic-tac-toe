import { Chance } from 'chance';
import { Game } from './game';

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

  // describe('can accept moves', () => {
  //
  //   expect(true).toBe(false);
  //
  // });
});
