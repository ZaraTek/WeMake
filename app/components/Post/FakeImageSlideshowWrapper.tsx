import { useState } from "react";
import Template from "./Templates/Template";
import type { PostType } from "../../../types/postTypes";

const FakeImageCollageWrapper = () => {
    const [post] = useState<PostType>({
        postTemplate: "Image",
        TemplateData: {
            ImageUrl: ["https://officemag.b-cdn.net/sites/default/files/jpegmari-underscores-jane-the-remover-15.jpeg", "https://officemag.b-cdn.net/sites/default/files/jpegmari-underscores-jane-the-remover-43.jpg", "https://officemag.b-cdn.net/sites/default/files/styles/slider/public/jpegmari-underscores-jane-the-remover-05_0.jpeg?itok=3TI8w95V&c=3e8659aa77f31c6a424e9424e74339e0"  ],
            Title: "Wallsocket",
            Subtitle: "Photos from Underscores' Wallsocket Concept",
        },
        imageTemplateVersion: "slideshow",
    } as const);

    return <Template post={post} />;
};

export default FakeImageCollageWrapper;