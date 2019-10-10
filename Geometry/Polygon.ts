import {Point, Edge} from "../Geometry"

export class Polygon {
  edges: Edge[];
  points: Point[];
  rotation: number = 0;

  constructor(
    points: Point[] = []
  ) {
    this.points = points;
    this.edges = this.points.map(
      (point: Point, index: number): Edge => {
        return new Edge(point, this.points[(index + 1) % this.points.length])
      }
    )
  }

  public getCenter() : Point {
    return this.points.reduce((center: Point, point: Point, index: number) => {
        center.x += point.x;
        center.y += point.y;

        if(index === this.points.length - 1) {
            center.x /= this.points.length;
            center.y /= this.points.length;
        }

        return center;
      }, new Point(0,0));
  };

  public collisionCheck(polygon: Polygon): boolean {
    let result = false;
    for(let x = 0; x < this.edges.length; x++) {
      for(let y = 0; y < polygon.edges.length; y++) {
        if(this.edges[x].intersectWith(polygon.edges[y])) {
          result = true;
          break;
        }
      }
    }

    return result;
  }

  public getPoints() : Point[] {
    return this.points || []
  }
}
