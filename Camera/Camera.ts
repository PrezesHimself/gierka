import {Point} from "../Geometry"
import {Entity} from "../Entities"
import {World} from "./World";
import {Input} from "./Game";
import {Keyboard} from "../Input/Keyboard";

export class Camera extends Entity {
  private offset: Point;
  private freeHand: boolean = true;
  private isColliding: boolean = false;
  weight: number = 60 * 0.017;
  speed = {
    x: .4,
    y: .4
  }

  constructor(
    public position: Point,
    private readonly target: Entity = null,
    private readonly canvas: HTMLCanvasElement,
    protected velocity: Vector2D = {x: 0, y: 0}
  ) {
    super(
      position,
      {width: canvas.width, height: canvas.height}
      )
    this.freeHand = !target;
    this.offset = new Point(canvas.width/2, canvas.height/2)
  }

  update(input: Input, world: World) {

    if(input.keyboard.isDown(Keyboard.KEYCODES.f)) {
      this.freeHand = false
    } 

    if(input.keyboard.isDown(Keyboard.KEYCODES.g)) {
      this.freeHand = true
    } 

    if(input.keyboard.isDown(Keyboard.KEYCODES.d)) {
      this.velocity.x += this.speed.x;
    } 
    if(input.keyboard.isDown(Keyboard.KEYCODES.a)) {
      this.velocity.x -= this.speed.x;
    } 
    if(input.keyboard.isDown(Keyboard.KEYCODES.w)) {
      this.velocity.y -= this.speed.x;
    }  
    if(input.keyboard.isDown(Keyboard.KEYCODES.s)) {
      this.velocity.y += this.speed.x;
    }

    if(this.target && !this.freeHand) {
      this.moveTo(this.target.position)
    } else {
      super.update(input, world);
    }
  }

  render(context: CanvasRenderingContext2D ) {
    context.translate(
      -this.position.x + this.offset.x ,
      -this.position.y + this.offset.y
    );
  }
}