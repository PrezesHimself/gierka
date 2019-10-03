import {Entity, Vector2D} from './Entity';
import {Input} from '../Game';
import {Keyboard} from '../Input/Keyboard';
import {World} from "../World";
import {Collision} from "../Physics";

export class Player extends Entity {
  selectable: boolean = true;
  color:string = 'orange';
  speed: Vector2D = {
    x: .4,
    y: .4
  }

  weight: number = 60 * 0.017;

  velocity: Vector2D ={
    x: 0,
    y: 0
  }

  update(input: Input, world: World) {
    super.update(input, world);


    if(input.keyboard.isDown(Keyboard.KEYCODES.right_arrow)) {
      this.velocity.x += this.speed.x;
    } 
    if(input.keyboard.isDown(Keyboard.KEYCODES.left_arrow)) {
      this.velocity.x -= this.speed.x;
    } 
    if(input.keyboard.isDown(Keyboard.KEYCODES.up_arrow)) {
      this.velocity.y -= this.speed.x;
    }  
    if(input.keyboard.isDown(Keyboard.KEYCODES.down_arrow)) {
      this.velocity.y += this.speed.x;
    }
  }
  renderLight(context: CanvasRenderingContext2D) {
    context.globalCompositeOperation = 'lighter';
        // Radii of the white glow.
    const radius = 80;

    context.fillStyle = "#111"; //blue
    context.beginPath();
    context.arc(this.position.x,this.position.y,radius,0,Math.PI*2,true);
    context.closePath();
    context.fill();
        context.beginPath();
    context.arc(this.position.x,this.position.y,radius*.8,0,Math.PI*2,true);
    context.closePath();
    context.fill();
    // context.fill();
  }

}