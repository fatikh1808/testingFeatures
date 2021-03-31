import React from "react";
import PropTypes from "prop-types";

import MainIcon from "./MainIcon";
import BackIcon from "./BackIcon";

export default function Loader({ size }) {
    return (
        <>
            <style>
                {
                    `
                        .preloader {
                            height: ${size};
                            width: ${size};
                            border-radius: 50%;
                            overflow: hidden;
                            padding: 10px;
                        }

                        .preloader .boom {
                            height: ${size};
                            width: ${size};
                            border-radius: 50%;
                            animation: 5s ease-in-out wider infinite;
                            clip-path: circle(0px at center);
                            position: absolute;
                        }

                        .preloader .boom svg {
                            height: ${size};
                            width: ${size};
                        }

                        @keyframes wider {
                            0% {
                                clip-path: circle(0px at center);
                            }
                            50% {
                                clip-path: circle(${size} at center);
                            }
                            0% {
                                clip-path: circle(0px at center);
                            }
                        }
                    `
                }
            </style>
            <div className={"preloader"}>
                <MainIcon />
                <BackIcon/>
            </div>
        </>
    )
}

Loader.propTypes = {
    size: PropTypes.string,
}

Loader.defaultProps = {
    size: "50vh",
}