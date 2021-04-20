import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import VKContext from "./VkContext";

const Post = ({ elementId, ownerId, postId, hash, options }) => {
    const vk = useContext(VKContext);

    useEffect(() => {
    if(vk) {
        vk.Widgets.Post("vk_post_388193692_380", 388193692, 380, 'k_fr7JhNKZNleWSI_jg2bvQthN5A');
    }
        return document.getElementById("vk_post_388193692_380").innerHTML = ""
    }, [vk]);

    return <div id={"vk_post_388193692_380"} />;
};

Post.propTypes = {
    elementId: PropTypes.string,
    ownerId: PropTypes.number.isRequired,
    postId: PropTypes.number.isRequired,
    hash: PropTypes.string.isRequired,
    options: PropTypes.shape({
        width: PropTypes.number
    })
};

Post.defaultProps = {
    elementId: "vk_post",
    options: {}
};

export default Post;