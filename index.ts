import {Game} from './Game';
import {Entity} from './Entities/Entity';
import './style.css';
import {Point} from "./Geometry/Point";
import Stats from 'stats.js';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');

const game = new Game({ticksPerSecond: 60}, canvas);
const world = game.getWorld();

for(let x = 0; x < 3; x++) {
  for(let y = 0; y < 10; y++) {
    world.addEntity(new Entity(
      new Point(100 * x, 100 * y),
      {width: 20, height: 20}
    ));
  }
}

game.start();

const stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

function animate() {

  stats.begin();

  requestAnimationFrame( animate );

  stats.end();


}

requestAnimationFrame( animate );