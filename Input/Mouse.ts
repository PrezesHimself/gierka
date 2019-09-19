export class Mouse {
  isDown: boolean = false;
  x: number = 0;
  y: number = 0;

  constructor(canvas) {
        canvas.addEventListener('mousedown', (event) => {
          this.isDown = true;
        });
        
        canvas.addEventListener('mouseup', (event) => {
          this.isDown = false;
        })

        canvas.addEventListener('mousemove', event => {
          const rect = canvas.getBoundingClientRect();
          this.x = event.clientX - rect.left;
          this.y = event.clientY - rect.top;
        });
  };

  public collidesWith(entity) {
      return (this.x > entity.position.x && this.x < entity.position.x + entity.size.width) && 
        (this.y > entity.position.y && this.y < entity.position.y + entity.size.height);
  }

  public hasClicked(entity) {
      return this.isDown && this.collidesWith(entity)
  }
}