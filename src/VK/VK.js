/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import VKContext from "./VkContext";
import VKApi from "./Api";

import { isDOMReady } from "./utils";

const VK = ({ onApiAvailable, apiId, options, children }) => {
    const [vk, setVK] = useState(null);

    useEffect(() => {
        if (isDOMReady) {
        new VKApi(apiId, options).load().then(api => {
            onApiAvailable(api);
            setVK(api);
        });
        }
    }, []);

    return (
        <VKContext.Provider value={vk}>{children}</VKContext.Provider>
    );
};

    VK.propTypes = {
    apiId: PropTypes.number,
    options: PropTypes.shape({
        version: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onlyWidgets: PropTypes.bool
    }),
    onApiAvailable: PropTypes.func
    };

    VK.defaultProps = {
    apiId: null,
    options: {
        version: 160,
        onlyWidgets: true
    },
    onApiAvailable: () => {}
};

export default VK;