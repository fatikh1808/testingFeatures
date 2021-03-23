import React from "react";
import { useWebGLContext, useShader, useProgram } from '@react-vertex/core'

import MapDrawer from "./map/MapDrower";

export default function App() {

    const vertex = `
        attribute vec3 center;   
        varying vec4 v_position;
        varying vec2 v_dist_from_o;
        varying vec3 v_center;
        uniform float time;
        void main()	{            
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            v_position = vec4( position, 1.0 );
            v_dist_from_o = abs(v_position.xy);                
            v_center = center;
            gl_Position = projectionMatrix * mvPosition;
        }
    `

    const fragment = `
        uniform float time;
        uniform vec2 resolution;
        varying vec4 v_position;
        varying vec2 v_dist_from_o;
        varying vec3 v_center;
        void main( void ) {         
            vec2 position = - 1.0 + 2.0 * gl_FragCoord.xy / resolution.xy;         
            float red   = abs( sin( (v_dist_from_o.y * position.y * .1) + ( v_dist_from_o.x * position.x * .1 ) + time * .2));            
            float green = abs( sin( position.y + time * .2 / 5.0 ) );
            float blue  = abs( sin( position.x + time * .2 / 4.0 ) );         
            gl_FragColor = vec4( red, green, blue, 1.0 );
        }          
    `

    const onUpdate = (delta, elapsed) => console.log(elapsed, delta);

    // const gl = useWebGLContext()
    // const vertShader = useShader(gl, vertex, true) // compile shaders somewhere
    // const fragShader = useShader(gl, fragment, true)

    // useProgram(gl, vertShader, fragShader)

    return (
        <>
            <div class="country_name"></div>
            <MapDrawer/>
        </>
    )
}