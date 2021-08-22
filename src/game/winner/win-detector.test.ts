import { WinDetector } from './win-detector';

describe('WinDetector', () => {
  //beforeEach(() => {});

  describe('constructor', () => {
    it('is able to get the game info necessary', () => {
      const detector = new WinDetector({ size: 3 });
    });
  });
  
});
