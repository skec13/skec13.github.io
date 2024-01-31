import * as THREE from "three";
import { gsap } from "gsap";
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper';

import Experience from "../Experience";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
        
        

    }

    setModel(){
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            console.log(child);
            if(child instanceof THREE.Group){
                child.children.forEach((groupChild) =>{
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            }
            //console.log(child);
            if(child.name === "window"){
                child.children[1].material = new THREE.MeshPhysicalMaterial({
                    roughness: 0,
                    metalness: 0,
                    transmission: 1
                });
            }
            if(child.name === "aquarium"){
                //console.log(child);
                child.children[3].material = new THREE.MeshPhysicalMaterial({
                    //color: 0x4287F5,
                    color: 0X8EB5F5,
                    roughness: 0,
                    metalness: 0.2,
                    transmission: 1
                });
            }
            if(child.name === "screen"){
                const texture = new THREE.TextureLoader().load("/textures/screen_git.png");
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
				//texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
				texture.colorSpace = THREE.SRGBColorSpace;
                texture.offset.set( 0, 0);
				texture.repeat.set( 1, 1);
				texture.center.set( 0.5, 0.5);
				texture.rotation = Math.PI / 2; 
                texture.generateMipmaps = false;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.needsUpdate = true;// rotation is around center


                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: texture
                })

            }
        
            

            this.roomChildren[child.name.toLowerCase()] = child;
           
            
        });

        const width1 = 0.9;
        const height1 = 0.5;
        const intensity1 = 5;
        const rectLight = new THREE.RectAreaLight(
            0X8EB5F5,
            intensity1,
            width1,
            height1
        );
        rectLight.name = "fishtank";
        rectLight.position.set(0.740876, 4.3, -4.66571);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = -Math.PI / 4;

        const width2 = 0.1;
        const height2 = 0.35;
        const intensity2 = 60;
        const rectLight2 = new THREE.RectAreaLight(
            0XEB9234,
            intensity2,
            width2,
            height2
        );
        rectLight2.name = "lamp";
        rectLight2.position.set(-3.4, 7.0, -3.25);
        rectLight2.rotation.x = -Math.PI / 2;
        rectLight2.rotation.z = -Math.PI / 4;


        const light = new THREE.PointLight(
            0XEB9234,
            1,
            1
        );
        light.position.set(-5.5, 3, 2);

        


        this.actualRoom.add(rectLight);
        this.actualRoom.add(rectLight2);
        this.actualRoom.add(light);
        

        //const rectLightHelper = new RectAreaLightHelper(rectLight2);
        //rectLight2.add(rectLightHelper);

        //const sphereSize = 1;
        //const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
        //light.add( pointLightHelper );

        this.roomChildren["rectLight"] = rectLight;
        this.roomChildren["rectLight2"] = rectLight2;
        this.roomChildren["light"] = light;

        console.log("This:");
        console.log(this.roomChildren.cube);

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.21, 0.21, 0.21);

    
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
    }

    resize(){
        
    }

    update(){
        this.lerp.current = gsap.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }
}