import {Game, GameOptions} from './Game';
import {Entity, Position, Size} from './Entities/Entity';
import {Player} from "./Entities/Player";
import {Collectable} from "./Entities";
import {Point, Edge} from "./Geometry";

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

world.addEntity(new Player(
  {x: 40, y: 40},
  {width: 30, height: 30}
));


game.start()

