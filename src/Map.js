import React from "react";
import * as VFX from "react-vfx";

import MapDrawer from "./map/MapDrower";
import "./map.css";

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

    const metal = `
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

    return (
        // <VFX.VFXProvider>
        //     <VFX.VFXSpan>
        <>
            <div className="country_name" style={{
                position: "fixed",
                bottom: "10%",
                left: "10%",
                fontSize: "4rem",
                color: "white",
                userSelect: "none",
                textShadow: "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000",
                fontFamily: "'Roboto', sans-serif"
                }}>

            </div>
            <MapDrawer/>
        </>
            /* </VFX.VFXSpan>
        </VFX.VFXProvider> */
    )
}