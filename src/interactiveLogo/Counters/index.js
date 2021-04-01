import React, {useState} from "react";
import CountUp from 'react-countup';

export default function Counters(){

    const [start, setStart] = useState(false)

    const counterArray = [
        {
            class: "title__top-left",
            end: 197,
            delay: 8,
            sufix: " стран"
        },        {
            class: "title__top-right",
            end: 2021,
            delay: 17,
            sufix: " г."
        },        {
            class: "title__bottom-left",
            end: 100,
            delay: 21,
            sufix: "%"
        },        {
            class: "title__bottom-right",
            end: 300,
            delay: 13,
            sufix: " лет"
        },
    ]

    return (
        <>
            {
                counterArray.map((item) => 
                    <div
                        className={`title ${item.class}`}
                    >
                        <CountUp
                            end={item.end}
                            duration={1}
                            delay={item.delay}
                            suffix={item.sufix}
                        />
                    </div>
                )
            }
        </>
    )
}