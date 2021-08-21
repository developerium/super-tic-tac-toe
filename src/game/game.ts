import { generateBySize, Pin, TileRow } from './tile/tile';

interface GameConstructorInput {
  size: number;
  players: string[];
  tiles?: TileRow[];
}

interface AddMoveInput {
  x: number;
  y: number;
  pin: Pin;
}

interface History {
  x: number;
  y: number;
  pin: Pin;
  player: string;
}

export class Game {
  private readonly players: string[];
  private playerIndex = 0;
  private tiles: TileRow[];
  private history: History[] = [];

  get playerCount(): number {
    return this.players.length;
  }

  get nextPlayer(): string {
    return this.players[this.playerIndex];
  }

  constructor({ size, players, tiles }: GameConstructorInput) {
    this.players = players;
    this.tiles = tiles || generateBySize(size);
  }

  getTiles(): TileRow[] {
    return this.tiles;
  }

  addMove({ x, y, pin }: AddMoveInput): void {
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

  validate({ x, y, pin }: AddMoveInput): boolean {
    const oldPin = this.tiles[x][y]?.pin;
    // if it's not occupied
    if (typeof oldPin === 'undefined') {
      return true;
    }

    return oldPin < pin;
  }
}
