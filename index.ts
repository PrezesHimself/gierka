import {Game, GameOptions} from './Game';
import {Entity, Position, Size} from './Entities/Entity';
import {Collectable} from "./Entities";
import {Point, Edge} from "./Geometry";
import './style.css';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');

const game = new Game({ticksPerSecond: 60}, canvas)
const world = game.getWorld();

for(let x = 0; x < 10; x++) {
  for(let y = 0; y < 10; y++) {
    world.addEntity(new Entity(
      {x: 100 * x, y: 100 * y},
      {width: 20, height: 20}
    ));
  }
}


game.start()

