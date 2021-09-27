import { Pin } from '../tile/tile';

interface PlayerManagerConstructor {
  ids: string[];
  pieceCount?: number;
}

export interface Player {
  id: string;
  name: string;
  cssClass: string;
  pieces: {
    [Pin.Small]: number;
    [Pin.Medium]: number;
    [Pin.Large]: number;
  };
}

const playerClasses = [
  'is-primary',
  'is-warning',
  'is-success',
  'is-error',
  'is-disabled',
];

const getInitialParams = ({
  id,
  index,
  pieceCount,
}: {
  id: string;
  index: number;
  pieceCount: number;
}): Player => ({
  id,
  name: `P${index + 1}`,
  cssClass: playerClasses[index],
  pieces: {
    [Pin.Small]: pieceCount,
    [Pin.Medium]: pieceCount,
    [Pin.Large]: pieceCount,
  },
});

export class PlayerManager {
  private players: { [id: string]: Player } = {};

  constructor({ ids, pieceCount = 3 }: PlayerManagerConstructor) {
    ids.forEach((id, index) => {
      this.players[id] = getInitialParams({
        id,
        index,
        pieceCount,
      });
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
