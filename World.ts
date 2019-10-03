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
  private lightData:Uint8ClampedArray = new Uint8ClampedArray([]);
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
    backgroundImage.crossOrigin="anonymous";
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
    this.context.fillStyle = 'black';
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
            // if(time % 10 === 0) {
        entity.renderLight(this.lightsContext);
            // }
      }
    )



    if(time % 4 === 0) {
      this.collisionCheck();
    }

    // if(time % 10 === 0) {
      const lightImageData = this.lightsContext.getImageData(0,0,this.canvas.width,this.canvas.height);
      this.lightData = lightImageData.data;
    // }

    this.context.restore();
    this.lightsContext.restore();

    const imageData = this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = (data[i] * (Math.pow(this.lightData[i], 1.4) + 100)) / 255;// red
      data[i + 1] = (data[i + 1] * (Math.pow(this.lightData[i], 1.4))) / 255; // green
      data[i + 2] = (data[i + 2] * (Math.pow(this.lightData[i], 1.4) + 30)) / 255; // blue
    }
    this.context.putImageData(imageData, 0, 0);


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