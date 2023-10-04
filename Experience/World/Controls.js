import * as THREE from "three";
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import ASScroll from '@ashthornton/asscroll';

import Experience from "../Experience";

export default class Controls {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach(child => {
            if(child.name === "fishtank"){
                this.rectLight = child;
            }
            if(child.name === "lamp"){
                this.rectLight2 = child;
            }
        })
        
        gsap.registerPlugin(ScrollTrigger);

        this.setSmoothScroll();
        this.setScrollTrigger();

    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.3,
            disableRaf: true,
        });

        gsap.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //desktop
            "(min-width: 969px)": () => {

                //resets
                this.room.scale.set(0.21, 0.21, 0.21);
                this.rectLight.width = 0.5;
                this.rectLight.height = 0.9;

                //First section
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0014;
                    }
                });

                //Second section
                this.secondMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 1;
                    },
                    z: () => {
                        return this.sizes.height * 0.006;
                    }
                }, "same");
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 1.0,
                    y: 1.0,
                    z: 1.0,
                }, "same");
                this.secondMoveTimeline.to(this.camera.orthographicCamera.rotation, {
                    z: 0.36,
                    y: 0.75,
                    
                });
                this.secondMoveTimeline.to(this.rectLight, {
                    width: 0.5 * 4,
                    height: 0.7 * 4,
                }, "same");
                this.secondMoveTimeline.to(this.rectLight2, {
                    width: 0.5 * 2,
                    height: 0.7 * 2,
                }, "same");

                //Third section
                this.thirdMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.thirdMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 1;
                    },
                    y: () => {
                        return this.sizes.height * -0.002;
                    },
                    z: () => {
                        return this.sizes.height * 0.008;
                    }
                }, "same");
            },
            //mobile
            "(max-width: 968px)": () => {
                //resets
                this.room.scale.set(0.07, 0.07, 0.07);
                this.rectLight.width = 0.3;
                this.rectLight.height = 0.4;
                this.rectLight2.width = 0.05;
                this.rectLight2.height = 0.15;

                //First section
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.room.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                });

                //Second section
                this.secondMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 1;
                    },
                    y: () => {
                        return this.sizes.height * 0.002;
                    },
                    z: () => {
                        return this.sizes.height * 0.0065;
                    }
                }, "same");
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.6,
                    y: 0.6,
                    z: 0.6,
                }, "same");
                this.secondMoveTimeline.to(this.camera.orthographicCamera.rotation, {
                    z: 0.36,
                    y: 0.75,
                    
                });
                this.secondMoveTimeline.to(this.rectLight, {
                    width: 0.5 * 4,
                    height: 0.7 * 4,
                }, "same");
                this.secondMoveTimeline.to(this.rectLight2, {
                    width: 0.5 * 1.5,
                    height: 0.7 * 1.5,
                }, "same");
                
                //Third section
                this.thirdMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.thirdMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 1;
                    },
                    y: () => {
                        return this.sizes.height * 0.002;
                    },
                    z: () => {
                        return this.sizes.height * 0.0105;
                    }
                }, "same");
                this.thirdMoveTimeline.to(this.room.scale, {
                    x: 0.55,
                    y: 0.55,
                    z: 0.55,
                }, "same");
                this.thirdMoveTimeline.to(this.rectLight, {
                    width: 0.5 * 4,
                    height: 0.7 * 4,
                }, "same");
            },

            all: () => {
                this.section = document.querySelectorAll(".section");
                this.section.forEach(section => {
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if(section.classList.contains("right")){
                        gsap.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            }
                        });
                        gsap.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            }
                        });
                    }else{
                        gsap.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            }
                        });
                        gsap.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            }
                        });    
                    }

                    gsap.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false
                        }
                    });
                });
                
            }

        });
    }
    

    resize(){
        
    }

    update(){
        
        
    }
}