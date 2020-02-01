import {World} from "./World";
import {Camera} from "../Camera/index";
import {Entity} from "../Entities/Entity";
import {Point} from "../Geometry/Point";
import {Player} from "../Entities/Player";
import {Portal} from "../Entities/Portal";

export class Sandbox extends World{
    protected background: CanvasPattern;
    protected context: CanvasRenderingContext2D;
    protected camera: Camera;
    protected player: Player;

    reinitialize() {
        this.player.moveTo(new Point(440, 440));
    }

    initialize(): void {

        this.addEntity(new Portal(
            1,
            new Point(300, 300),
            {width: 20, height: 20}
        ));

        this.player = this.addEntity(new Player(
            new Point(440, 440),
            {width: 30, height: 30}
        ));

        const backgroundImage = new Image();
        backgroundImage.crossOrigin="anonymous";
        backgroundImage.src = 'https://cdnb.artstation.com/p/assets/images/images/001/146/575/large/ulrick-wery-tileableset2-soil.jpg?1441028621';
        backgroundImage.onload = () => {
            this.background = this.context.createPattern(backgroundImage, 'repeat');
        };

        this.camera.setTarget(this.player);
    }
}