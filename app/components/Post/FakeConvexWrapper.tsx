import { useState } from "react";
import Template from "./Templates/Template";
import type { PostType } from "../../../types/postTypes";


const FakeConvexWrapper = () => {
// use state for the font size
    const [post] = useState<PostType>({
        postTemplate: 'Audio',
        TemplateData: {
            AudioUrl: 'https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg',
            Title: 'Pyman',
            Subtitle: 'An Introduction to Interactive Programming in Python',
            CoverImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsdCkZbZazHiwiBpoTBuRJVETWSjjJbZgekQ&s'
        },
        writeUpData: "This is a song I made.",
    });

    return (
        <Template post={post} />
    );

};

export default FakeConvexWrapper;