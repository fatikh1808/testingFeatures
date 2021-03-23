import React from "react";
import ReactMarkdown from "react-markdown";
const remarkClasses = require("./remarkClasses");

function App() {
    const markdowen =
        "# Heading \nfhighlight> Node with classname <bhighlight. <div>Render HTML as text</div>. \n\nfnoindex> Node with classname noindex <bnoindex. kwfwewejdoiwe ewdoiwejd wedjewodi \n\nfext> Node with classname <bext \nkiller fotikh yp bitches";

    return (
        <div>
            <ReactMarkdown
                plugins={[remarkClasses()]}
                children={markdowen}
                allowDangerousHtml
            />
        </div>
    );
}

export default App;
