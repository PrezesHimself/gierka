import {Entity} from "./Entities/Entity";
import {Input} from "./Game";

export class World {
  private readonly context: CanvasRenderingContext2D;
  private entities: Entity[] = [];

  public friction: number = 0.95;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.context = this.canvas.getContext('2d');
  }

  update(input: Input, time: number) {
    // do stuff
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.entities.forEach(
      (entity: Entity) => {
        entity.update(input, this);
        entity.render(this.context);

        const {x, y} = entity.collision.getCenter()
        point(x, y, this.context )

        function point(x, y, context){
          context.beginPath();
          context.arc(x, y, 1, 0, 2 * Math.PI, true);
          context.stroke();
        }
      }
    )
    if(time % 3 === 0) {
      this.collisionCheck()
    }
  }

  collisionCheck() {
    this.entities.forEach(
      (entityA: Entity) => {
        this.entities.forEach(
          (entityB: Entity) => {
            if(entityA === entityB) {
              return
            }
            if(entityA.collisionCheck(entityB, this)) {
              return;
            }

            entityB.isColliding = false;
          }
        )
      }
    )
  }
  
  public addEntity(entity: Entity) {
    this.entities.push(entity)
  };

  public removeEntity(entity: Entity) {
    this.entities = this.entities.filter( e => e !== entity )
  }
  
}