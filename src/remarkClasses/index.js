const unistBuilder = require("unist-builder");
const get = require("lodash/get");

module.exports = function remarkClasses(params = {}) {
    const classNames = get(params, "classNames", {
        highlight: /^(fhighlight&gt;)|(fhighlight>)\s/,
        fNoindex: /^(fnoindex&gt;)|(fnoindex>)\s/,
        ext: /^(fext&gt;)|(fext>)\s/,
    });

    const changeTag = (r, value) => {
        const tagReturner = (value, r1, ftag, btag, r2) => {
            return value.replace(r1, ftag).replace(r2, btag);
        };

        switch (r) {
            case classNames.highlight:
                return tagReturner(
                    value,
                    r,
                    "<p class='highlight'>",
                    "</p>",
                    "<bhighlight"
                );
            case classNames.fNoindex:
                return tagReturner(
                    value,
                    r,
                    "<noindex>",
                    "</noindex>",
                    "<bnoindex"
                );
            case classNames.ext:
                return tagReturner(
                    value,
                    r,
                    "<p class='ext'>",
                    "</p>",
                    "<bext"
                );
            default:
                console.error("get error params");
                break;
        }
    };

    function mapTree(tree, iteratee) {
        function preorder(node, index, parent) {
            const newNode = iteratee(node, index, parent);

            if (Array.isArray(newNode.children)) {
                newNode.children = newNode.children.map((child, index) => {
                    return preorder(child, index, node);
                });
            }

            return newNode;
        }

        return preorder(tree, null, null);
    }

    return function () {
        return function (tree) {
            return mapTree(tree, (node) => {
                const children = get(node, "children", []);
                const nodeType = get(node, "type", "");

                if (nodeType !== "paragraph") {
                    return node;
                }

                const [{ value, type }, ...siblings] = children;

                if (type !== "text") {
                    return node;
                }

                if (
                    !Object.values(classNames).some((className) =>
                        className.test(value)
                    )
                ) {
                    return node;
                }

                const [className, r] = Object.entries(classNames).find(
                    ([, r]) => {
                        return r.test(value);
                    }
                );

                const newChild = {
                    type: "html",
                    value: changeTag(r, value),
                };

                return unistBuilder("text", [newChild, ...siblings]);
            });
        };
    };
};
