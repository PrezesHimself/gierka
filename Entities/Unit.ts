import {Entity} from './Entity';

export class Unit extends Entity {
  selectable: boolean = true;
  color:string = 'green';
  update(mouse) {
    if(mouse.hasClicked(this)) {
      this.color = 'red'
      this.position.x += 1;
    } else {
      this.color = 'green'
    }
  }
}