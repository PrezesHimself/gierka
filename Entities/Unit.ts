import {Entity} from './Entity';
import {Input} from '../Game';

export class Unit extends Entity {
  selectable: boolean = true;
  color:string = 'green';
}