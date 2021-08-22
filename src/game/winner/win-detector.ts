interface WinDetectorConstructorInput {
  size: number;
}

export class WinDetector {
  private size: number;

  constructor({ size }: WinDetectorConstructorInput) {
    this.size = size;
  }
}
