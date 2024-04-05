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
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.world.on("worldready", () => {
            this.setAssets();
            this.firstIntro();
        });
    }

    setAssets(){
        
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;

    }

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new gsap.timeline();
            this.timeline.to(".page", {y:0})
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                        .classList.add("hidden");
                },
            });
        
            
                
        });

    }

}