import {Entity, Player} from "./Entities";
import {Input} from "./Game";
import {Camera} from "./Camera";
import {Point} from "./Geometry";

export class World {
  private readonly context: CanvasRenderingContext2D;
  private readonly lightsContext: CanvasRenderingContext2D;
  private entities: Entity[] = [];
  private camera: Camera;
  private player: Player;
  private background: Image = new Image();

  public friction: number = 0.95;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly lights: HTMLCanvasElement
  ) {
    this.context = this.canvas.getContext('2d');
    this.lightsContext = this.lights.getContext('2d');

    this.player = this.addEntity(new Player(
        {x: 440, y: 440},
        {width: 30, height: 30}
    ));

    this.camera = new Camera(
      new Point(0,0),
      this.player,
      this.canvas
    );

    const backgroundImage = new Image()
    backgroundImage.src = 'https://cdnb.artstation.com/p/assets/images/images/001/146/575/large/ulrick-wery-tileableset2-soil.jpg?1441028621';
    backgroundImage.onload = () => {
      this.background = this.context.createPattern(backgroundImage, 'repeat');
    };
  }

  update(input: Input, time: number) {
    // do stuff
    this.context.save();
    this.lightsContext.save();

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.lightsContext.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.camera.update(input, this);
    this.camera.render(this.context);
    this.camera.render(this.lightsContext);

    this.context.fillStyle = this.background;
    this.context.fillRect(-10000, -10000, 20000, 20000);


    this.getEntities(
      (entityA:Entity, entityB: Entity):number => {
        return entityA.position.y < entityB.position.y ? -1 : 1
      }
    ).forEach(
      (entity: Entity) => {
        entity.update(input, this);
        entity.render(this.context);
      }
    )
    
    this.getEntities(
      (entityA:Entity, entityB: Entity):number => {
        return entityA.position.y < entityB.position.y ? -1 : 1
      }
    ).forEach(
      (entity: Entity) => {
        entity.renderLight(this.lightsContext);
      }
    )



    if(time % 3 === 0) {
      this.collisionCheck()
    }
    this.context.restore();
    this.lightsContext.restore();

    const lightsBitmap = this.lightsContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.context.globalCompositeOperation = 'overlay';
    this.context.drawImage(this.lights,0,0, this.canvas.width, this.canvas.height);
    this.context.globalCompositeOperation = 'source-over';

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

  public getEntities(sort: Function) : Entity[] {
    if(!sort) return this.entities;

    return this.entities.sort(sort)
  }
  
}