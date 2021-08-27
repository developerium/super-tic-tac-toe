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

export type LocationSet = Location[];

export const generateBySize = (size: number): TileRow[] => {
  return Array.from(new Array(size), () => new Array(size).fill(null));
};

export const getWinningMoves = (size: number): LocationSet[] => {
  const result: LocationSet[] = [];

  for (let i = 0; i < size; i++) {
    const horizontal: Location[] = [];

    for (let j = 0; j < size; j++) {
      horizontal.push({ x: i, y: j });
    }

    result.push(horizontal);
  }

  return result;
};
