import {Game, GameOptions} from './Game';
import {Entity, Position, Size} from './Entities/Entity';
import {Unit} from "./Entities/Unit";

class Wood extends Entity {
}

const canvas = <HTMLCanvasElement>document.getElementById('canvas');

const game = new Game({ticksPerMinute: 60*60}, canvas)
const world = game.getWorld();

world.addEntity(new Entity(
  {x: 0, y: 0},
  {width: 20, height: 20}
));

world.addEntity(new Unit(
  {x: 40, y: 40},
  {width: 20, height: 20}
));



game.start()

