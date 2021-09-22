import { Location, TileRow, getWinningMoves, LocationSet } from '../tile/tile';

interface WinDetectorConstructorInput {
  size: number;
}

export interface WinnerResult {
  player: string;
  locations: Location[];
}

export class WinDetector {
  private readonly winningMoves: LocationSet[];

  constructor({ size }: WinDetectorConstructorInput) {
    this.winningMoves = getWinningMoves(size);
  }

  getWinner(tiles: TileRow[]): WinnerResult | null {
    for (const locationSet of this.winningMoves) {
      let player = null;

      for (const { x, y } of locationSet) {
        const tilePlayer = tiles[x][y]?.player;
        if (!tilePlayer) {
          player = null;
          break; // this set is missing a player
        }

        if (!player) {
          player = tilePlayer;
          continue;
        }

        if (player !== tilePlayer) {
          player = null;
          break; // different players
        }
      }

      if (player) {
        return {
          player,
          locations: locationSet,
        };
      }
    }

    return null;
  }
}
