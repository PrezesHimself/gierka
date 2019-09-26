import {Point} from "./Geometry"
import {Entity} from "./Entities"

export class Camera {
  private readonly context: CanvasRenderingContext2D;
  constructor(
    private position: Point,
    private readonly target: Entity = null,
    private readonly canvas: HTMLCanvasElement 
  ) {
    this.context = this.canvas.getContext('2d');
  }

  update() {
    if(this.target) {
      this.position.x = (this.canvas.width/2) - this.target.position.x;
      this.position.y = (this.canvas.height/2) - this.target.position.y;
    }
    this.context.translate(this.position.x, this.position.y);
  }
}