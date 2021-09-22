import { generateBySize, Pin, TileRow, Location } from './tile/tile';
import { WinDetector, WinnerResult } from './win-detector/win-detector';

interface GameConstructor {
  size: number;
  players: string[];
  tiles?: TileRow[];
}

interface MoveInput extends Location {
  pin: Pin;
}

interface History extends Location, MoveInput {
  player: string;
}

export class Game {
  private readonly players: string[];
  private playerIndex = 0;
  private tiles: TileRow[];
  private history: History[] = [];
  private winDetector: WinDetector;

  get playerCount(): number {
    return this.players.length;
  }

  get nextPlayer(): string {
    return this.players[this.playerIndex];
  }

  constructor({ size, players, tiles }: GameConstructor) {
    this.players = players;
    this.tiles = tiles || generateBySize(size);
    this.winDetector = new WinDetector({ size });
  }

  getTiles(): TileRow[] {
    return this.tiles;
  }

  createMove({ x, y, pin }: MoveInput): void {
    const player = this.nextPlayer;

    this.tiles[x][y] = { player, pin };
    this.history.push({ x, y, pin, player });

    this.goToNextPlayer();
  }

  goToNextPlayer(): void {
    this.playerIndex++;

    if (typeof this.players[this.playerIndex] === 'undefined') {
      this.playerIndex = 0;
    }
  }

  validate({ x, y, pin }: MoveInput): boolean {
    const oldPin = this.tiles[x][y]?.pin;
    // if it's not occupied
    if (typeof oldPin === 'undefined') {
      return true;
    }

    return oldPin < pin;
  }

  getWinner(): WinnerResult | null {
    return this.winDetector.getWinner(this.tiles);
  }
}
