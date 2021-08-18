import { generateBySize } from './tile';

describe('Tile', () => {
  //beforeEach(() => {});

  describe('generateBySize', () => {
    it('can generate a 3x3 empty array', () => {
      expect(generateBySize(3)).toStrictEqual([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]);
    });

    it('can generate a 5x5 empty array', () => {
      expect(generateBySize(5)).toStrictEqual([
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
      ]);
    });

    it('can generate a 10x10 empty array', () => {
      expect(generateBySize(10)).toStrictEqual([
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
      ]);
    });
  });
});