import { Chance } from 'chance';

import { PlayerManager } from './player-manager';

describe('PlayerManager', () => {
  const chance = Chance();

  describe('constructor', () => {
    it('can generate with given player ids', () => {
      const playerIds = [chance.guid(), chance.guid()];

      const manager = new PlayerManager({ ids: playerIds });

      expect(manager.getPlayers().length).toBe(2);
    });
  });
});
