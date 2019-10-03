import {Entity} from "./Entities/Entity";
import {World} from "./World"; 
import {Mouse} from "./Input/Mouse";
import {Keyboard} from "./Input/Keyboard";

export interface Input {
    mouse: Mouse,
    keyboard: Keyboard
  }

export class Game {
  gameTimer: number;
  gameTicks: number = 0;


  options: GameOptions;
  world: World;
  mouse: Mouse;
  keyboard: Keyboard;
  input: Input; 
  time: number;

  camera: Camera;

  constructor(options: GameOptions, canvas: HTMLCanvasElement, lights: HTMLCanvasElement) {
    this.options = options;
    
    this.world = new World(canvas, lights);

    window.addEventListener('resize', () => {
      this.resizeCanvas(canvas);
      this.resizeCanvas(lights)
    }, false);

    this.resizeCanvas(canvas);
    this.resizeCanvas(lights)
    
    this.mouse = new Mouse(canvas);
    this.keyboard = new Keyboard()
    this.input = {
      mouse: this.mouse,
      keyboard: this.keyboard
    }
  }

  resizeCanvas(canvas) {
    canvas.width = window.innerWidth/2;
    canvas.height = window.innerHeight/2;
  }

  public start() {
    console.log('game started', this.options);
    this.time = 0;
    this.gameTick()
    this.gameTimer = setInterval(
      () => {
        this.gameTick();
      },
      (1000) / this.options.ticksPerSecond
    )
    this.world.update(this.input);
  }

  private gameTick() {
    this.time++;
    this.world.update(this.input, this.time);
  }

  public getWorld(): World {
    return this.world;
  }
}

export interface GameOptions {
  debug?: boolean,
  fps?: number,
  ticksPerSecond: number
}