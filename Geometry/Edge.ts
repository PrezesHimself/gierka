import {Point} from "./Point";

export class Edge {
  pointA: Point;
  pointB: Point;

  constructor(pointA: Point, pointB: Point) {
    this.pointA = pointA;
    this.pointB = pointB;
  }

  intersectWith(edge: Edge): boolean {
    var a_dx = this.pointB.x - this.pointA.x;
    var a_dy = this.pointB.y - this.pointA.y;
    var b_dx = edge.pointB.x - edge.pointA.x;
    var b_dy = edge.pointB.y - edge.pointA.y;
    var s = (-a_dy * (this.pointA.x - edge.pointA.x) + a_dx * (this.pointA.y - edge.pointA.y)) / (-b_dx * a_dy + a_dx * b_dy);
    var t = (+b_dx * (this.pointA.y - edge.pointA.y) - b_dy * (this.pointA.x - edge.pointA.x)) / (-b_dx * a_dy + a_dx * b_dy);
    return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
  }
}