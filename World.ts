import {Entity, Player} from "./Entities/index";
import {GameOptions, Input} from "./Game";
import {Camera} from "./Camera/index";
import {Point} from "./Geometry/index";

export class World {
  private readonly context: CanvasRenderingContext2D;
  private entities: Entity[] = [];
  private player: Player;
  private background: CanvasPattern;
  public friction: number = 0.95;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly camera: Camera
  ) {
    this.context = this.canvas.getContext('2d');

    this.player = this.addEntity(new Player(
        new Point(440, 440),
        {width: 30, height: 30}
    ));

    camera.setTarget(this.player);

    const backgroundImage = new Image()
    backgroundImage.crossOrigin="anonymous";
    backgroundImage.src = 'https://cdnb.artstation.com/p/assets/images/images/001/146/575/large/ulrick-wery-tileableset2-soil.jpg?1441028621';
    backgroundImage.onload = () => {
      this.background = this.context.createPattern(backgroundImage, 'repeat');
    };
  }

  update(input: Input, time: number) {
    // do stuff
    this.context.save();

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = 'black';

    this.camera.update(input, this);
    this.camera.render(this.context);

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
    );



    if(time % 4 === 0) {
      this.collisionCheck();
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

  public getEntities(sort: (a: Entity, b: Entity) => number) : Entity[] {
    if(!sort) return this.entities;

    return this.entities.sort(sort)
  }
  
}