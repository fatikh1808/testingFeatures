const unistBuilder = require("unist-builder");
const get = require("lodash/get");

export function remarkClasses(params = {}) {
    const classNames = get(params, "classNames", {
        highlight: /^(highlight&gt;)|(highlight>)\s/,
        noindex: /^(noindex&gt;)|(noindex>)\s/,
        ext: /^(ext&gt;)|(ext>)\s/,
    });

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
                    type,
                    value: value.replace(r, ""),
                };

                const props = {
                    className,
                };

                return unistBuilder("paragraph", props, [
                    newChild,
                    ...siblings,
                ]);
            });
        };
    };
}
