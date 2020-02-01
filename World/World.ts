import {Entity, Player} from "../Entities/index";
import {Game, GameOptions, Input} from "../Game";
import {Camera} from "../Camera/index";
import {Point} from "../Geometry/index";

// todo world class should be abastract
export class World {
  protected context: CanvasRenderingContext2D;
  private entities: Entity[] = [];
  protected player: Player;
  protected background: CanvasPattern;
  public friction: number = 0.95;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    protected readonly camera: Camera,
    public readonly game: Game
  ) {
    this.context = this.canvas.getContext('2d');
    this.initialize();
  }

  initialize() {

  }

  reinitialize() {
    this.initialize();
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