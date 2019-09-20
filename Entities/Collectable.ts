import {Entity} from "./Entity";
import {World} from "../World";

export class Collectable extends Entity {
  public collisionHandler(entity: Entity, world: World, collision) {
    super.collisionHandler(entity, world, collision)
    world.removeEntity(this)
  }
}