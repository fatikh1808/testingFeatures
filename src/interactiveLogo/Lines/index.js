import React from "react";

export default function Lines() {
    
    const lineArray = [
        "line_vertical line__bottom-right-vertical",
        "line_horizontal line__bottom-right-horizontal",
        "line_vertical line__bottom-left-vertical",
        "line_horizontal line__bottom-left-horizontal",
        "line_vertical line__top-right-vertical",
        "line_vertical line__top-left-vertical",
        "line_horizontal line__top-right-horizontal",
        "line_horizontal line__top-left-horizontal"
    ]

    return (
        <>
            {
                lineArray.map((item) => <div className={`line ${item}`}/>)
            }
        </>
    )
}