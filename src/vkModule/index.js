const apple = require("./vk");

const article = `
<script type="text/javascript" src="https://vk.com/js/api/openapi.js?168"></script>

<!-- VK Widget -->
<div id="vk_article_-26284064_15959"></div>

<script type="text/javascript">
VK.Widgets.Article("vk_article_-26284064_15959", "@tassagency-mayakovskiy");
</script>`

const post = `<div id="vk_post_388193692_380"></div>
        <script type="text/javascript" src="https://vk.com/js/api/openapi.js?168"></script>
        <script type="text/javascript">
        (function() {
            VK.Widgets.Post("vk_post_388193692_380", 388193692, 380, 'k_fr7JhNKZNleWSI_jg2bvQthN5A');
        }());
        </script>`

console.log(apple({
    url: post,
}))

