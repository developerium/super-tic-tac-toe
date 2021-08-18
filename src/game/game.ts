import { generateBySize, TileRow } from './tile/tile';

interface GameConstructorInput {
  size: number;
  players: string[];
}

export class Game {
  private readonly players: string[];
  private playerIndex = 0;
  private tiles: TileRow[];

  get playerCount(): number {
    return this.players.length;
  }

  get nextPlayer(): string {
    return this.players[this.playerIndex];
  }

  constructor({ size, players }: GameConstructorInput) {
    this.players = players;
    this.tiles = generateBySize(size);
  }

  getTiles() {
    return this.tiles;
  }
}
