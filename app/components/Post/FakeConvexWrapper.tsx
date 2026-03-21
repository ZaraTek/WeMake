import { useState } from "react";
import Template from "./Templates/Template";
import type { PostType } from "../../../types/postTypes";


const FakeConvexWrapper = () => {
// use state for the font size
    // const [post] = useState<PostType>({
    //     postTemplate: 'Audio',
    //     TemplateData: {
    //         AudioUrl: 'https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg',
    //         Title: 'Pyman',
    //         Subtitle: 'An Introduction to Interactive Programming in Python',
    //         CoverImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsdCkZbZazHiwiBpoTBuRJVETWSjjJbZgekQ&s'
    //     },
    // });

    // const [post] = useState<PostType>({
    //     postTemplate: 'Video',
    //     TemplateData: {
    //         VideoUrl: 'https://www.youtube.com/watch?v=y-2T4Jm0nYk',
    //         Title: 'Learn to Swim',
    //         Subtitle: 'A music video for "Learn to Swim" by Quadeca',
    //         ThumbnailUrl: 'https://i.ytimg.com/vi/y-2T4Jm0nYk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC3YwCPvUGdyb1dAQQ3mobII95p0A',
    //         PreviewUrl: "https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOT6M7KCUG2R8kaphCMfsYSq1tDLoHX20iyKguJ"
    //     },
    // });

    const [post] = useState<PostType>({
        postTemplate: 'Video',
        TemplateData: {
            VideoUrl: 'https://www.youtube.com/watch?v=y-2T4Jm0nYk',
            Title: 'Learn to Swim',
            Subtitle: 'A music video for "Learn to Swim" by Quadeca',
            ThumbnailUrl: 'https://i.ytimg.com/vi/y-2T4Jm0nYk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC3YwCPvUGdyb1dAQQ3mobII95p0A',
            PreviewUrl: "https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOT6M7KCUG2R8kaphCMfsYSq1tDLoHX20iyKguJ"
        },
    });

    return (
        <Template post={post} />
    );

};

export default FakeConvexWrapper;