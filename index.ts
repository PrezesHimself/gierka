import {Game} from './Game';
import {Entity} from './Entities/Entity';
import './style.css';
import {Point} from "./Geometry/Point";
import Stats from 'stats.js';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');

const game = new Game(
    {
      ticksPerSecond: 60,
      pixelRatio: 2
    },
    canvas
);

const stats = process.env.DEBUG && new Stats();

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

// todo move to new ./Debug/Debug.ts
const debug: any = {
    game
};
(window as any).debug = debug;

