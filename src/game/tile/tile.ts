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

export const generateBySize = (size: number): TileRow[] => {
  return Array.from(new Array(size), () => new Array(size).fill(null));
};
