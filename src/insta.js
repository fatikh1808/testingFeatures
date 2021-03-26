import React from "react";
import InstagramEmbed from 'react-instagram-embed';

export default function App() {
    return (
        <InstagramEmbed
            url='https://www.instagram.com/p/CM4bRpJjDcE/?utm_source=ig_web_copy_link'
            clientAccessToken='1560234874366509|1c8bf169d4fd8c2c44fdada12e0292ef'
            maxWidth={600}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
        />
    )
}