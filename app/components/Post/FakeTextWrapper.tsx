import { useState } from "react";
import Template from "./Templates/Template";
import type { PostType } from "../../../types/postTypes";

const FakeTextWrapper = () => {
    // use state for the font size

    const [post] = useState<PostType>({
        postTemplate: 'Text',
        TemplateData: {
            Title: 'How to be a drunk ndn',
            Subtitle: 'A poem from poetryfoundation.org',
            Highlight: "I mumble quietly to no one to maybe stop drinking.\"",
            backgroundUrl: "https://i.pinimg.com/originals/a9/28/95/a92895b3583b6bf2b63b6066e94c65c0.jpg"
        },
    });

    return (
        <Template post={post} />
    );

};

export default FakeTextWrapper;