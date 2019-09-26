import {Entity, Player} from "./Entities";
import {Input} from "./Game";
import {Camera} from "./Camera";
import {Point} from "./Geometry";

export class World {
  private readonly context: CanvasRenderingContext2D;
  private entities: Entity[] = [];
  private camera: Camera;

  public friction: number = 0.95;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.context = this.canvas.getContext('2d');
    this.camera = new Camera(
      new Point(0,0),
      this.addEntity(new Player(
        {x: 440, y: 440},
        {width: 30, height: 30}
      )),
      this.canvas
    )
  }

  update(input: Input, time: number) {
    // do stuff
    this.context.save();
  
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.camera.update();
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
    this.context.restore();
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
    this.entities.push(entity);
    return entity;
  };

  public removeEntity(entity: Entity) {
    this.entities = this.entities.filter( e => e !== entity )
  }
  
}