import {Entity, Position, Size, Vector2D} from "./Entity";
import {Collision} from "../Physics/Collision";
import {World} from "../World/World";
import {Game} from "../Game";

export class Portal extends Entity {
    selectable: boolean = true;
    color: string = 'orange';
    game: Game;

    constructor(
        private portalTarget: number = null,
        public position: Position,
        public size: Size = null,
    ) {
        super(position, size);

    }
    collisionHandler(entity: Entity, world: World, collision: Collision) {
        world.game.setCurrentWorld(this.portalTarget)
    }
}