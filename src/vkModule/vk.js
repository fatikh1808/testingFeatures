module.exports = function getParams({ url }) {
    const postMatch = /\("..+\)/gm
    const params = url.match(postMatch);
    const paramsFilter = params[0].replace(/\(/gm, "").replace(/\)/gm, "").replace(/\'/gm, `"`);
    const product = JSON.parse("[" + paramsFilter + "]").map((item) => item !== String ? item.toString() : item);

    return product;
}
