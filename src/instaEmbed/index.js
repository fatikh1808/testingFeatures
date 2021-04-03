import React from "react";
import InstagramEmbed from 'react-instagram-embed';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';

export default function Insta() {
    return [
        <InstagramEmbed
                url='https://www.instagram.com/p/CNJtwNYAaUY/?utm_source=ig_web_button_share_sheet'
                clientAccessToken='605569673629766|b73e80780d959da7b369758d24bdb45f'
                maxWidth={320}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
        />,
        <FacebookProvider appId="605569673629766">
            <EmbeddedPost href="https://www.facebook.com/serafimova.zemlya/posts/285356659727570" width="500" />
        </FacebookProvider>
    ]
}