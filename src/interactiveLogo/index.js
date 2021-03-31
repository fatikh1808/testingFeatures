import React from "react";

import BottomLeftArrow from "./BottomLeftArrow";
import BottomRightArrow from "./BottomRightArrow";
import TopLeftArrow from "./TopLeftArrow";
import TopRightArrow from "./TopRightArrow";
import Circle from "./Circle";

import "./index.scss";

export default function Interactive() {
    return (
        <div className={"container"} style={{ height: "300px", width: "300px" }}>
            <div className={"line__bottom-right-vertical"} />
            <div className={"line__bottom-right-horizontal"} />
            <div className={"line__bottom-left-vertical"} />
            <div className={"line__bottom-left-horizontal"}/>
            <div className={"line__top-right-vertical"} />
            <div className={"line__top-left-vertical"}/>
            <div className={"line__top-right-horizontal"}/>
            <div className={"line__top-left-horizontal"}/>
            <svg 
                id="b0fd4f48-5899-4ac9-8ed1-48ae595ec019"
                data-name="e3514f70-3084-46fe-9488-1819cbb02961"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 349 349.2"
                style={{ height: "100%", overflow: "visible" }}
            >
                <defs>
                    <radialGradient id="bb9bbb19-bb1f-45c3-92bc-5ba31301f21d" cx="-876.95" cy="-0.87" r="1" gradientTransform="translate(25023.6 185.1) scale(28.34 28.33)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#4388ba"/>
                        <stop offset="0.61" stop-color="#1f274a"/>
                    </radialGradient>
                    <radialGradient id="b90379f9-5ccd-4c9d-8c3e-e9af332ec5a2" cx="-900.92" cy="-11.74" r="1" gradientTransform="translate(146383 2082) scale(162.29 162.27)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#4388ba"/>
                        <stop offset="1" stop-color="#1f274a"/>
                    </radialGradient>
                </defs>
                <Circle />
                <TopLeftArrow/>
                <TopRightArrow/>
                <BottomLeftArrow/>
                <BottomRightArrow/>
            </svg>
        </div>
    )
}