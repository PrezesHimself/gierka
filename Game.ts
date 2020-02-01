import {Entity} from "./Entities/Entity";
import {JacksRoom, Sandbox, World} from "./World/index";
import {Point} from "./Geometry/index";
import {Mouse} from "./Input/Mouse";
import {Keyboard} from "./Input/Keyboard";
import {Camera} from "./Camera/Camera";

export interface Input {
    mouse: Mouse,
    keyboard: Keyboard
  }

export class Game {
  gameTimer: NodeJS.Timeout;
  gameTicks: number = 0;


  options: GameOptions;
  //todo worlds should be rewriten to WorldsManager class
  //todo since I had problem with resetting the level after change
  // due to the bad implementation of collision box position
  // i change that to a factory of levels so the current world
  // get a fresh instance - that acually might not be a problem
  // perhaps that even better from the memory managment point of view
  public worlds: (() => World)[];
  currentWorld: World;
  mouse: Mouse;
  keyboard: Keyboard;
  input: Input; 
  time: number;

  camera: Camera;

  constructor(options: GameOptions, canvas: HTMLCanvasElement) {
    this.camera = new Camera(
        new Point(0,0),
        null,
        canvas,
        options
    );

    this.worlds = [
      () => new Sandbox(canvas, this.camera, this),
      () => new JacksRoom(canvas, this.camera, this)
    ];

    this.options = options;

    this.currentWorld = this.worlds[0]();

    window.addEventListener('resize', () => {
      this.resizeCanvas(canvas);
    }, false);

    this.resizeCanvas(canvas);
    
    this.mouse = new Mouse(canvas);
    this.keyboard = new Keyboard()
    this.input = {
      mouse: this.mouse,
      keyboard: this.keyboard
    }
  }

  resizeCanvas(canvas: HTMLCanvasElement  ) {
    canvas.width = window.innerWidth / this.options.pixelRatio;
    canvas.height = window.innerHeight / this.options.pixelRatio;
  }

  public start() {
    console.log('game started', this.options);
    this.time = 0;
    this.gameTick();
    this.gameTimer = setInterval(
      () => {
        this.gameTick();
      },
      (1000) / this.options.ticksPerSecond
    );
    this.currentWorld.update(this.input, this.time);
  }

  private gameTick() {
    this.time++;
    this.currentWorld.update(this.input, this.time);
  }

  public getWorld(): World {
    return this.currentWorld;
  }

  public setCurrentWorld(worldIndex: number) {
    this.currentWorld = this.worlds[worldIndex]();
  }
}

export interface GameOptions {
  debug?: boolean,
  fps?: number,
  ticksPerSecond: number,
  pixelRatio: number
}