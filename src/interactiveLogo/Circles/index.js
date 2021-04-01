import React from "react";

export default function Circles() {
    
    const circleArray = [
        "circle__top-left",
        "circle__top-right",
        "circle__bottom-left",
        "circle__bottom-right"
    ]

    return (
        <>
            {
                circleArray.map((item) => <div className={`circle ${item}`}/>)
            }
        </>
    )
}