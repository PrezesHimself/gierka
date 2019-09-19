import {Entity} from "./Entities/Entity";
import {World} from "./World"; 
import {Mouse} from "./Input/Mouse";

export class Game {
  gameTimer: number;
  gameTicks: number = 0;

  options: GameOptions;
  world: World;
  mouse: Mouse

  constructor(options: GameOptions, canvas: HTMLCanvasElement) {
    this.options = options;
    
    this.world = new World(canvas);

     window.addEventListener('resize', () => this.resizeCanvas(canvas), false);
    this.resizeCanvas(canvas);
    this.mouse = new Mouse(canvas);
  }

  resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  public start() {
    console.log('game started', this.options);
    this.gameTick()
    this.gameTimer = setInterval(
      () => {
        this.gameTick();
      },
      (60 * 1000) / this.options.ticksPerMinute
    )
    this.world.render(this.mouse);
  }

  private gameTick() {
    this.world.render(this.mouse);
  }

  public getWorld(): World {
    return this.world;
  }
}

export interface GameOptions {
  debug?: boolean,
  fps?: number,
  ticksPerMinute: number
}