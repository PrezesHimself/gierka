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

const stats: any = new Stats();

game.start();

if(stats) {
    stats.dom && stats.showPanel( 0 );
  document.body.appendChild( stats.dom || stats.domElement );
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

