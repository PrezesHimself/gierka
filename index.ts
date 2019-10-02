import {Game, GameOptions} from './Game';
import {Entity, Position, Size} from './Entities/Entity';
import {Collectable} from "./Entities";
import {Point, Edge} from "./Geometry";
import './style.css';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const lights = <HTMLCanvasElement>document.getElementById('lights')

const game = new Game({ticksPerSecond: 60}, canvas, lights)
const world = game.getWorld();

for(let x = 0; x < 2; x++) {
  for(let y = 0; y < 2; y++) {
    world.addEntity(new Entity(
      {x: 100 * x, y: 100 * y},
      {width: 20, height: 20}
    ));
  }
}


game.start()

