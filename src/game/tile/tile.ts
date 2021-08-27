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
    const vertical: Location[] = [];

    for (let j = 0; j < size; j++) {
      horizontal.push({ x: i, y: j });
      vertical.push({ x: j, y: i });
    }

    result.push(horizontal);
    result.push(vertical);
  }

  const diameter1: Location[] = [];
  const diameter2: Location[] = [];
  for (let i = 0; i < size; i++) {
    diameter1.push({ x: i, y: i });
    diameter2.push({ x: i, y: size - 1 - i });
  }

  result.push(diameter1);
  result.push(diameter2);

  return result;
};
