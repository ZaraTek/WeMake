import { useState } from "react";
import Template from "./Templates/Template";
import type { PostType } from "../../../types/postTypes";

const FakeVideoWrapper = () => {
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

    return <Template post={post} />;
};

export default FakeVideoWrapper;