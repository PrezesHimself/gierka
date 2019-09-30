import {Point} from "../Geometry"
import {Entity} from "../Entities"
import {World} from "./World";
import {Input} from "./Game";
import {Keyboard} from "../Input/Keyboard";

export class Camera extends Entity {
  private freeHand: boolean = true;
  private isColliding: boolean = false;

  constructor(
    public position: Point,
    private readonly target: Entity = null,
    private readonly canvas: HTMLCanvasElement 
  ) {
    
    this.freeHand = !target;
  }

  update(input: Input, world: World) {
    if(input.keyboard.isDown(Keyboard.KEYCODES.f)) {
      this.freeHand = false
    } 

    if(input.keyboard.isDown(Keyboard.KEYCODES.g)) {
      this.freeHand = true
    } 

    if(this.target && this.freeHand) {
      this.position.x = this.target.position.x;
      this.position.y = this.target.position.y;
    }
  }

  render(context: CanvasRenderingContext2D ) {
    context.translate(
      -this.position.x + (this.canvas.width/2),
      -this.position.y + (this.canvas.height/2)
    );
  }
}