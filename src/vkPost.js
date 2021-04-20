/* eslint-disable no-undef */
import React, {useEffect} from "react";

export default function VkShow(){

    useEffect(() => {
        VK.Widgets.Post("vk_post_388193692_380", 388193692, 380, 'k_fr7JhNKZNleWSI_jg2bvQthN5A');
        return document.getElementById("vk_post_388193692_380").innerHTML = ""
    }, []);

    return (
        <div id="vk_post_388193692_380">
        </div>
    )
}
