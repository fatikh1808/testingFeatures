import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";

const Article = ({ elementId, articleUrl }) => {

    useEffect(() => {
        // eslint-disable-next-line no-undef
        if(window.VK) {
            window.VK.Widgets.Article("vk_article_tassagency-mayakovskiy", "@tassagency-mayakovskiy");
        }
    }, [window]);

    return <div id={"vk_article_tassagency-mayakovskiy"} />;
};

Article.propTypes = {
    elementId: PropTypes.string,
    articleUrl: PropTypes.string.isRequired
};

Article.defaultProps = {
    elementId: "vk_article"
};

export default Article;