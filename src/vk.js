import React, {useState, useRef, useEffect} from "react";
import VK, { Post, Article } from "react-vk";

export default function App() {

    return (
        <>
            "test"
            <VK>
                <Post elementId={"vk_post_388193692_380"} options={{width: 500}} ownerId={"388193692"} postId={"380"} hash={"k_fr7JhNKZNleWSI_jg2bvQthN5A"} />
                <Article elementId={"vk_article_-26284064_15959"} articleUrl={"@tassagency-mayakovskiy"}/>
            </VK>
        </>
    );
}
