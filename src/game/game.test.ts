import { Chance } from 'chance';
import { Game} from './game';

describe('Game', () =>        {
  const chance = Chance();

  describe('can create a new game by getting the size of dimension and player count', () => {


    it.each([{
      players: [chance.guid(), chance.guid()],
      size: 3
    }])('can create a game with 2 players', ({ size, players }) => {
      const newGame = new Game({size, players });
      
      expect(newGame.size).toBe(size);
      expect(newGame.playerCount).toBe(players.length);
      expect(newGame.nextPlayer).toBe(players[0]);
    });
  });

  // describe('can accept moves', () => {
  //
  //   expect(true).toBe(false);
  //
  // });
});

         
         