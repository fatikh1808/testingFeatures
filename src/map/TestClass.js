import React from "react";
import * as THREE from 'three';
import anime from 'animejs';

export default class TestClass extends React.Component {
    constructor(scene, raycastObjs, lineObjs, isShaderOn) {
        super(scene);
        this.backgroundColor = "#" + scene.background.getHexString();
        this.raycastObjs = raycastObjs;
        this.lineObjs = this.lineObjs;
        this.isShaderOn = isShaderOn;
        this.shapeColor = "#000000";
        this.lineColor = "#ff0000";
        this.stagger = this.stagger.bind(this);
        this.staggerIn = this.staggerIn.bind(this);
        this.staggerOut = this.staggerOut.bind(this);
        this.randomColors = this.randomColors.bind(this);
        this.neonMap = this.neonMap.bind(this);
        this.turnShaderOn = this.turnShaderOn.bind(this);
    }

    stagger(zPosition) {
        let staggerObjs = this.raycastObjs.map((obj) => {
            return obj.position
        });
        let staggerLines = this.lineObjs.map((obj) => {
            return obj.position
        });

        anime({targets: staggerObjs, z: zPosition, delay: anime.stagger(25), easing: "easeInQuad"})

        anime({targets: staggerLines, z: zPosition, delay: anime.stagger(25), easing: "easeOutQuad"})
    }

    staggerIn() {
        this.stagger(0);
    }

    staggerOut() {
        this.stagger(300);
    }

    randomColors() {                        
        for(const shape of this.raycastObjs) {
            let color = Math.random() * 0xffffff;
            if(this.isShaderOn) 
                shape.material = new THREE.MeshBasicMaterial({color: color});
            shape.material.color.set(color); 
            shape.userData.shapeColor = color;
        }
        for(const line of this.lineObjs) {
            let color = Math.random() * 0xffffff;
            if(this.isShaderOn) 
                line.material = new THREE.LineBasicMaterial({color: color});

            line.material.color.set(color);                            
            line.userData.lineColor = color;
        }
        this.scene.background.set(Math.random() * 0xffffff);
        this.isShaderOn = false;
    }

    neonMap() {                        
        for(const shape of this.raycastObjs) {
            let color = 0x000000;
            if(this.isShaderOn) 
                shape.material = new THREE.MeshBasicMaterial({color: color});
            shape.material.color.set(color); 
            shape.userData.shapeColor = color;
        }
        for(const line of this.lineObjs) {
            let color = Math.random() * 0xffffff;
            if(this.isShaderOn) 
                line.material = new THREE.LineBasicMaterial({color: color});

            line.material.color.set(color);                            
            line.userData.lineColor = color;
        }
        this.scene.background.set(0x000000);
        this.isShaderOn = false;
    }

    turnShaderOn() {
        this.isShaderOn = true;
        for(const shape of this.raycastObjs) {                            
            let center = new THREE.Vector3();
            shape.geometry.boundingBox.getCenter(center);
            let centerArray = []
            center.toArray(centerArray);
            shape.geometry.setAttribute( 'center', new THREE.Float32BufferAttribute( centerArray, 3 ) );

            shape.material = new THREE.ShaderMaterial({
                uniforms: this.uniforms,
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('stateShader').textContent
            });
        }

        for(const line of this.lineObjs) {                            
            line.material = new THREE.ShaderMaterial({
                uniforms: this.uniforms,
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('lineShader').textContent
            });
        }             
    }


    render() {
        this.staggerIn();
        this.staggerOut();
        this.randomColors();
        this.turnShaderOn();
        this.neonMap();
        return (
            <>
            </>
        )
    }
}
