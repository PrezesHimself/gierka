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
} 