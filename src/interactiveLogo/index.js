import React from "react";

import Circles from "./Circles";
import Lines from "./Lines";
import Counters from "./Counters";
import LogoSvg from "./LogoSvg";
import Texts from "./Texts";

import "./index.scss";

export default function Interactive() {
    return (
        <div className={"container"} style={{ height: "300px", width: "300px" }}>
            <Counters />
            <Texts/>
            <Lines/>
            <Circles />
            <LogoSvg/>
        </div>
    )
}