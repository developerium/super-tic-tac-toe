export enum Pin {
  Small,
  Medium,
  Large,
}

export interface Tile {
  player: string;
  pin: Pin;
}

export type TileRow = (Tile | null)[];

export interface Location {
  x: number;
  y: number;
}

export interface WinnerResult {
  player: string;
  locations: Location[];
}

export const generateBySize = (size: number): TileRow[] => {
  return Array.from(new Array(size), () => new Array(size).fill(null));
};

export const getWinner = (tiles: TileRow[]): WinnerResult | null => {
  // const length = tiles.length;
  // for (let i = 0; i < length; i++) {
  //   const tileRow = tiles[i];
  //
  //   for (let j = 0; j < length; j++) {
  //     const tile = tiles[i][j];
  //   }
  // }

  return getWinnerHorizontally(tiles);
};

const getWinnerHorizontally = (tiles: TileRow[]): WinnerResult | null => {
  const length = tiles.length;

  let player: string | null = null;
  let locations: Location[] = [];

  for (let x = 0; x < length; x++) {
    const firstTile = tiles[x][0];
    const lastTile = tiles[x][length - 1];

    if (!firstTile || !lastTile) {
      continue;
    }

    player = firstTile.player;
    locations.push({ x, y: 0 });

    for (let y = 1; y < length; y++) {
      const tile = tiles[x][y];

      if (player !== tile?.player) {
        player = null;
        locations = [];
        break;
      }

      locations.push({ x, y });
    }

    if (player) {
      return { player, locations };
    }
  }

  return null;
};
