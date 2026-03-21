import { useState } from "react";
import Template from "./Templates/Template";
import type { PostType } from "./postTypes";


const FakeConvexWrapper = () => {
// use state for the font size
    const [post] = useState<PostType>({
        postTemplate: 'Image',
        TemplateData: {
            ImageUrl: ['https://placehold.co/600x400'],
            Title: 'Title',
            Subtitle: 'Subtitle',
        },
        writeUpData: "I am a write up for the post",
    });

    return (
        <Template post={post} />
    );

};

export default FakeConvexWrapper;