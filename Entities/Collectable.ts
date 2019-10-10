import {Entity} from "./Entity";
import {World} from "../World";
import {Collision} from "../Physics/Collision";

export class Collectable extends Entity {
  public collisionHandler(entity: Entity, world: World, collision: Collision) {
    super.collisionHandler(entity, world, collision)
    world.removeEntity(this)
  }
}