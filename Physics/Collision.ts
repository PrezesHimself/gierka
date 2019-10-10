import {Entity} from "../Entities";
import {Point} from "../Geometry";

export class Collision {
  entityA: Entity;
  entityB: Entity;

  constructor(entityA: Entity, entityB: Entity) {
    this.entityA = entityA;
    this.entityB = entityB;
  }

  getCollisionAngle():number {
    const centerA = this.entityA.collision.getCenter();
    const centerB = this.entityB.collision.getCenter();
    return Math.atan2(centerB.y - centerA.y, centerB.x - centerA.x);
  }

  getCollisionForce(): Point {
    return new Point(
      Math.abs(this.entityA.velocity.x) +  Math.abs(this.entityB.velocity.x),
      Math.abs(this.entityA.velocity.y) +  Math.abs(this.entityB.velocity.y)
    )
  }


}