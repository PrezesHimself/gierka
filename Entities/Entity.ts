import {World} from "./World";
import {Input} from "./Game";
import {Polygon, Point} from "../Geometry"; 
import {Collision} from "../Physics";

export class Entity {
  
  color:string = 'black';
  selectable: boolean = false;
  collision: Polygon;
  collidesWith: Entity[] = [];
  isColliding: boolean = false;
  weight: number = 1000 * 0.017;

  constructor(
    protected position: Position,
    protected size: Size,
    protected speed: Vector2D,
    protected velocity: Vector2D = {x: 0, y: 0}
  ) {
    this.collision = new Polygon(
      [
        new Point(this.position.x, this.position.y),
        new Point(this.position.x + this.size.width, this.position.y),
        new Point(this.position.x + this.size.width, this.position.y + this.size.height),
        new Point(this.position.x, this.position.y + this.size.height),
      ]
    );
  }

  update(input: Input, world: World) {
    this.velocity.x *= world.friction / this.weight;
    this.velocity.y *= world.friction / this.weight;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.collision.points.forEach((
      point: Point
    ) => {
      point.x += this.velocity.x;
      point.y += this.velocity.y;
    });

  };

  public collisionCheck(entity: Entity, world: World) {
    if(!this.collision || !entity.collision) return false;
    
    const collided = this.collision.collisionCheck(entity.collision);
    
    if(collided) {
      const collision = new Collision(this, entity);
      this.isColliding = true;
      entity.isColliding = true;
      this.collisionHandler(entity, world, collision)
    }
    return collided;
  }

  public collisionHandler(entity: Entity, world: World, collision: Collision) {
    const force = collision.getCollisionForce();

    this.velocity.x = -Math.cos(collision.getCollisionAngle()) * force.x;
    this.velocity.y = -Math.sin(collision.getCollisionAngle()) * force.y;
  }

  render(context: CanvasRenderingContext2D ) {
    context.fillStyle = this.color;
    if(this.isColliding) {
      context.fillStyle = 'red';
    }
    // context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);

    context.beginPath();
    context.moveTo(this.collision.points[0].x, this.collision.points[0].y);
    this.collision.points.forEach(
      (point: Point) => {
        context.lineTo(point.x, point.y);
      }
    )
    context.fill();
  }
}

export interface Position extends Vector2D{
}

export interface Size {
  width: number;
  height: number;
}

export interface Vector2D  {
  x: number;
  y: number;
}