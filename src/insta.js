import React from "react";
import InstagramEmbed from 'react-instagram-embed';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';

export default function App() {
    return (
        <FacebookProvider appId="1560234874366509">
            <EmbeddedPost href="https://www.facebook.com/fit4brain/posts/4061288663931711" width="500" />
        </FacebookProvider>
    )
}