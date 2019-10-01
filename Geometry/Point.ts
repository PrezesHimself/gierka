const TOLERANCE = 0.1;

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distance(target: Point ): Point {
    return new Point(
      target.x - this.x,
      target.y - this.y
    );
  }

  isEqual(target: Point):boolean {
    return Math.abs(target.x - this.x) < TOLERANCE &&
      Math.abs(target.y - this.y) < TOLERANCE;
  }
} 