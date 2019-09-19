import {World} from "./World";

export class Entity {
  
  color:string = 'black';
  selectable: boolean = false;
  
  constructor(
    private position: Position,
    private size: Size
  ) {

  }
  update(world: World) {};

  render(context: CanvasRenderingContext2D ) {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  }
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}