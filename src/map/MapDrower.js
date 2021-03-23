import React from "react";
import * as THREE from 'three';
import * as topojson from "topojson-client";
import anime from 'animejs';
import { Country } from "./Country";
import Hammer from "hammerjs"
import topology from "./world_map_web_merc.json"

export default class MapDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.scene = new THREE.Scene();            
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
        this.isShaderOn = true;           
        this.renderer = new THREE.WebGLRenderer();
        this.uniforms = {
                    time: { type: "f", value: .1 },
                    resolution: { type: "v2", value: new THREE.Vector2() },
                    currentPos: { type: "v3", value: new THREE.Vector3() }
        };
        this.startTime = Date.now();
        this.cameraUpdatePos = new THREE.Vector3(0, 45, 200);
        this.raycastObjs = [];
        this.lineObjs = [];
        this.createEnv = this.createEnv.bind(this);
        this.animate = this.animate.bind(this);
        this.setupEventListeners = this.setupEventListeners.bind(this);
        // this.createGUI = this.createGUI.bind(this);
    }

    createEnv() {
        this.scene.background = new THREE.Color(0x222222);

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement); 
    
        let features = topojson.feature(topology, topology.objects.world_map);
        console.log(features);
        console.log(topojson.bbox(topology));

        for (const feature of features.features) {
            let country = new Country(feature.geometry, feature.properties);                        
            let shape = country.createShape();
            let line = country.createLine();
            this.raycastObjs.push(shape);
            this.lineObjs.push(line);

            // Workaround due to South Africa not having proper hole rendering
            if (country.properties.NAME === "Lesotho") {
                shape.position.z = .1;
                line.position.z = .1;
            }
            
            this.scene.add(shape);
            this.scene.add(line);
        }
        this.uniforms.resolution.value.x = window.innerWidth;
        this.uniforms.resolution.value.y = window.innerHeight;                    
    }

    animate() {
        requestAnimationFrame(this.animate);
        let elapsedMilliseconds = Date.now() - this.startTime;
        let elapsedSeconds = elapsedMilliseconds / 1000.;
        this.uniforms.time.value = 60. * elapsedSeconds/10;
        
        this.camera.position.x = this.cameraUpdatePos.x;                
        this.camera.position.y = this.cameraUpdatePos.y;
        this.camera.position.z = this.cameraUpdatePos.z;
        
        this.renderer.render(this.scene, this.camera);
    }

    setupEventListeners() {
        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2();
        let INTERSECTED = null;
        let CLICKED = null;

        document.addEventListener("click", onDocumentClick.bind(this), false);
        function onDocumentClick(event) {
            console.log(event)
            mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, this.camera);

            let intersects = raycaster.intersectObjects(this.raycastObjs);

            if(this.isShaderOn) {
                if (intersects.length > 0)
                    document.querySelector(".country_name").innerText = intersects[0].object.userData.properties.NAME;
                else
                    document.querySelector(".country_name").innerText = "";
            }
            else {
                if (intersects.length > 0) {

                    if (CLICKED) {
                        CLICKED.material.color.set(CLICKED.userData.shapeColor);
                    }

                    CLICKED = intersects[0].object;
                    CLICKED.material.color.set(0x164B91);

                    document.querySelector(".country_name").innerText = CLICKED.userData.properties.NAME;

                    } else {

                    if (CLICKED) {
                        CLICKED.material.color.set(CLICKED.userData.shapeColor);
                        document.querySelector(".country_name").innerText = "";
                    }

                    CLICKED = null;
                }
            }
        }

        document.addEventListener("wheel", onDocumentMouseWheel.bind(this), false);
        function onDocumentMouseWheel(event) {
            let direction = Math.sign(event.deltaY);
            let moveToZ = this.camera.position.z + (direction * 40);
            moveToZ = THREE.MathUtils.clamp(moveToZ, 30, 200);

            anime({
                targets: this.cameraUpdatePos,
                z: moveToZ,
                duration: 500,
                easing: "easeOutQuad"
            })
        }

        document.addEventListener("mousemove", onMouseMove.bind(this), false);
        function onMouseMove(event) {
            event.preventDefault();                    

            mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

            if(this.isShaderOn)
                return;

            raycaster.setFromCamera(mouse, this.camera);

            let intersects = raycaster.intersectObjects(this.raycastObjs);

            if (intersects.length > 0) {
                if (INTERSECTED && INTERSECTED !== CLICKED) {
                    INTERSECTED.material.color.set(INTERSECTED.userData.shapeColor);
                }

                INTERSECTED = intersects[0].object;

                if (INTERSECTED !== CLICKED) {
                    INTERSECTED.material.color.setHex(0x666666);
                }

            } else {
                if (INTERSECTED && INTERSECTED !== CLICKED) {
                    INTERSECTED.material.color.set(INTERSECTED.userData.shapeColor);
                }
            } 
        }

        let hammertime = new Hammer(window);
        let lastScale = 1;
        hammertime.get('pinch').set({ enable: true });
        hammertime.on("pinchstart pinchin pinchout pinchend", function(ev) {
            console.log(ev.center)
            let moveToZ = this.camera.position.z;
            
            if (ev.scale < lastScale) {
                moveToZ += 1 * (1/ev.scale);
            } else if (ev.scale > lastScale) {
                moveToZ -= 1 * ev.scale;
            }
            lastScale = ev.scale;

            if(ev.type === "pinchend") {                        
                lastScale = 1;
            }    

            this.cameraUpdatePos.z = THREE.MathUtils.clamp(moveToZ, 30, 200);;
        });

        

        let startPos = new THREE.Vector3();
        let currentPos = new THREE.Vector3(); 
        let delta = new THREE.Vector3();
        hammertime.on("panstart panmove", function(ev) {
            if(ev.type === "panstart") {                        
                startPos.set( 
                    (ev.srcEvent.clientX / window.innerWidth) * 2 - 1, 
                    -(ev.srcEvent.clientY / window.innerHeight) * 2 + 1, 
                    0.5 
                );

                startPos.unproject( this.camera );
                startPos.sub(this.camera.position).normalize();                        
                let distance = - this.camera.position.z / startPos.z;
                startPos.multiplyScalar( distance )
                
                startPos.x += this.cameraUpdatePos.x;
                startPos.y += this.cameraUpdatePos.y;
            }

            if (ev.type === "panmove") 
            {                    
                currentPos.set( 
                    (ev.srcEvent.clientX / window.innerWidth) * 2 - 1, 
                    -(ev.srcEvent.clientY / window.innerHeight) * 2 + 1, 
                    0.5 
                );         
                

                currentPos.unproject( this.camera );
                currentPos.sub(this.camera.position).normalize();
                let distance = - this.camera.position.z / currentPos.z;
                currentPos.multiplyScalar( distance );
                
                delta.subVectors(startPos, currentPos);                                                 

                this.cameraUpdatePos.x = THREE.MathUtils.clamp(delta.x, -200, 200);
                this.cameraUpdatePos.y = THREE.MathUtils.clamp(delta.y, -50, 140); //Y clamp is strange because Antartica has been removed, but the coordinates stated the same
            }
        });

        window.addEventListener("resize", onWindowResize.bind(this), false);
        function onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    render() {
        this.createEnv()
        this.animate()
        this.setupEventListeners()

        return (
            <div>
            </div>
        )
    }
}
