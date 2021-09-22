import { Chance } from 'chance';

import { PlayerManager } from './player-manager';
import { Pin } from '../tile/tile';

describe('PlayerManager', () => {
  const chance = Chance();
  const playerIds = [chance.guid(), chance.guid()];

  describe('constructor', () => {
    it('can generate with given player ids', () => {
      const manager = new PlayerManager({ ids: playerIds });

      expect(manager.getPlayers().length).toBe(2);
    });
  });

  describe('removePin', () => {
    it('removes a pin from a user', () => {
      const manager = new PlayerManager({ ids: playerIds });

      expect(manager.getPlayers()[0].pieces[Pin.Large]).toBe(3);

      expect(manager.removePin({ player: playerIds[0], pin: Pin.Large })).toBe(
        true
      );
      expect(manager.getPlayers()[0].pieces[Pin.Large]).toBe(2);

      expect(manager.removePin({ player: playerIds[0], pin: Pin.Large })).toBe(
        true
      );
      expect(manager.getPlayers()[0].pieces[Pin.Large]).toBe(1);

      expect(manager.removePin({ player: playerIds[0], pin: Pin.Large })).toBe(
        true
      );
      expect(manager.getPlayers()[0].pieces[Pin.Large]).toBe(0);

      // can't remove anymore, it's zero now
      expect(manager.removePin({ player: playerIds[0], pin: Pin.Large })).toBe(
        false
      );
    });
  });

  describe('getPlayer', () => {
    it('will give player back by id', () => {
      const manager = new PlayerManager({ ids: playerIds });

      expect(manager.getPlayer(playerIds[0])).toMatchObject({
        id: playerIds[0],
      });

      expect(manager.getPlayer('bad id')).toBeUndefined();
    });
  });
});
