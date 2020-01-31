import {Game} from './Game';
import {Entity} from './Entities/Entity';
import './style.css';
import {Point} from "./Geometry/Point";
import Stats from 'stats.js';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');

const game = new Game({ticksPerSecond: 60}, canvas);
const world = game.getWorld();
const stats = process.env.DEBUG && new Stats();

for(let x = 0; x < 3; x++) {
  for(let y = 0; y < 10; y++) {
    world.addEntity(new Entity(
      new Point(100 * x, 100 * y),
      {width: 20, height: 20}
    ));
  }
}

game.start();

if(stats) {
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );
}


function animate() {

  if(stats) stats.begin();

  requestAnimationFrame( animate );

  if(stats) stats.end();


}

requestAnimationFrame( animate );