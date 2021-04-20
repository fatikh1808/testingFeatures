import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./VK/Article";
import reportWebVitals from "./reportWebVitals";
import VK from "./VK/VK"

function CallApi() {
    useEffect(() => {
        if (!document.getElementById("vk-openapi")) {
            const script = document.createElement("script");
    
            script.type = "text/javascript";
            script.id = "vk-openapi";
            script.src = `https://vk.com/js/api/openapi.js?168`;
            script.async = true;
    
            document.head.appendChild(script);
        }
    }, [])
    return null
}

ReactDOM.render(
    <React.StrictMode>
        <VK>
            <App />
        </VK>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
