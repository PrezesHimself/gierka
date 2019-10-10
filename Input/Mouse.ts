import {Entity} from "../Entities";

export class Mouse {
  isDown: boolean = false;
  x: number = 0;
  y: number = 0;

  constructor(canvas: HTMLCanvasElement) {
        canvas.addEventListener('mousedown', (event: MouseEvent) => {
          this.isDown = true;
        });
        
        canvas.addEventListener('mouseup', (event: MouseEvent) => {
          this.isDown = false;
        });

        canvas.addEventListener('mousemove', (event: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          this.x = event.clientX - rect.left;
          this.y = event.clientY - rect.top;
        });
  };

  public collidesWith(entity: Entity) {
      return (this.x > entity.position.x && this.x < entity.position.x + entity.size.width) && 
        (this.y > entity.position.y && this.y < entity.position.y + entity.size.height);
  }

  public hasClicked(entity: Entity) {
      return this.isDown && this.collidesWith(entity)
  }
}