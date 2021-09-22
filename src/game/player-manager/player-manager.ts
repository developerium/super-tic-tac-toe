import { Pin } from '../tile/tile';

interface PlayerManagerConstructor {
  ids: string[];
}

export interface Player {
  id: string;
  cssClass: string;
  index: number;
  pieces: {
    [Pin.Small]: number;
    [Pin.Medium]: number;
    [Pin.Large]: number;
  };
}

const playerClasses = [
  'is-success',
  'is-warning',
  'is-error',
  'is-primary',
  'is-disabled',
];

const getInitialParams = ({ id, index }: { id: string; index: number }) => ({
  id,
  index: index + 1,
  cssClass: playerClasses[index],
  pieces: {
    [Pin.Small]: 3,
    [Pin.Medium]: 3,
    [Pin.Large]: 3,
  },
});

export class PlayerManager {
  private players: { [id: string]: Player } = {};

  constructor({ ids }: PlayerManagerConstructor) {
    ids.forEach((id, index) => {
      this.players[id] = getInitialParams({ id, index });
    });
  }

  getPlayers(): Player[] {
    return Object.values(this.players);
  }

  removePin({ pin, player }: { pin: Pin; player: string }): boolean {
    if (!this.players[player].pieces[pin]) {
      return false;
    }

    this.players[player].pieces[pin]--;

    return true;
  }

  getPlayer(playerId?: string): Player | undefined {
    if (!playerId) {
      return undefined;
    }

    return this.players[playerId];
  }
}
