import React from "react";
import TextyAnim from 'rc-texty';

import "rc-texty/assets/index.css";

export default function Texts() {

    const textArray = [
        {
            text: "Каждый из нас понимает очевидную вещь",
            className: "text__top-left",
            delay: 9000
        },
        {
            text: "Каждый из нас понимает очевидную вещь",
            className: "text__top-right",
            delay: 18000
        },
        {
            text: "Каждый из нас понимает очевидную вещь",
            className: "text__bottom-left",
            delay: 22000
        },
        {
            text: "Каждый из нас понимает очевидную вещь",
            className: "text__bottom-right",
            delay: 14000
        },
    ]

    return (
        <>
            {
                textArray.map((item) => <span className={`text ${item.className}`}>

                    <TextyAnim
                        type="mask-top"
                        onEnd={(type) => {
                            // tslint:disable-next-line
                            console.log(type);
                        }}
                        delay={item.delay}
                        >
                        {item.text}
                    </TextyAnim>

                </span>)
            }
        </>
    )
}