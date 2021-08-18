export enum Pin {
  Small,
  Medium,
  Big
}

export interface Tile {
  player: string;
  pin: Pin
}

export type TileRow = Tile[]

export const generateBySize = (size: number): TileRow[] => {
  return Array.from(new Array(size), () => new Array(size).fill(null));
};
