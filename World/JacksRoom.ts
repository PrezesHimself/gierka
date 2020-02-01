import {World} from "./World";
import {Camera} from "../Camera/index";
import {Player} from "../Entities/Player";
import {Point} from "../Geometry/Point";
import {Portal} from "../Entities/Portal";

export class JacksRoom extends World{
    reinitialize() {
        this.player.moveTo(new Point(440, 440));
    }

    initialize(): void {
        this.player = this.addEntity(new Player(
            new Point(440, 440),
            {width: 30, height: 30}
        ));

        this.addEntity(new Portal(
            0,
            new Point(300, 300),
            {width: 20, height: 20}
        ));

        const backgroundImage = new Image()
        backgroundImage.crossOrigin="anonymous";
        backgroundImage.src = 'https://cdna.artstation.com/p/assets/images/images/009/291/482/medium/oliver-hitchen-tileable-grass-x4.jpg?1518144203';
        backgroundImage.onload = () => {
            this.background = this.context.createPattern(backgroundImage, 'repeat');
        };
    }
}