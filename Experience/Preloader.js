import EventEmitter from "events";
import { gsap } from "gsap";

import Experience from "./Experience";

export default class Preloader extends EventEmitter{
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.world = this.experience.world;

        this.world.on("worldready", () => {
            //sthis.setAssets();
            //this.playIntro();
        });
    }

    setAssets(){
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;

    }

    firstIntro(){
        this.timeline = new gsap.timeline();

        this.timeline.to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 1,
        }).to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
        })
    }

    playIntro(){
        this.firstIntro();
    }
}