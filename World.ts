import {Entity} from "./Entities/Entity";
import {Mouse} from "./Input/Mouse";

export class World {
  private readonly context: CanvasRenderingContext2D;
  private entities: Entity[] = [];

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.context = this.canvas.getContext('2d');
  }

  render(mouse: Mouse) {
    // do stuff
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.entities.forEach(
      (entity: Entity) => {
        entity.update(mouse);
        entity.render(this.context);
      }
    )
  }

  public addEntity(entity: Entity) {
    this.entities.push(entity)
  };
  
}