import {Game} from './Game';
import {Entity} from './Entities/Entity';
import './style.css';
import {Point} from "./Geometry/Point";

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const lights = <HTMLCanvasElement>document.getElementById('lights');

console.log('tesr', canvas, document);
const game = new Game({ticksPerSecond: 60}, canvas, lights);
const world = game.getWorld();

for(let x = 0; x < 3; x++) {
  for(let y = 0; y < 10; y++) {
    world.addEntity(new Entity(
      new Point(100 * x, 100 * y),
      {width: 20, height: 20}
    ));
  }
}


game.start()

