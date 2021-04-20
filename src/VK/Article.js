import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import VKContext from "./VkContext";

const Article = ({ elementId, articleUrl }) => {
  const vk = useContext(VKContext);

    useEffect(() => {
        if (vk) {
            vk.Widgets.Article("vk_article_tassagency-mayakovskiy", "@tassagency-mayakovskiy")
        }

        return document.getElementById("vk_article_tassagency-mayakovskiy").innerHTML = ""
  }, [vk]);

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