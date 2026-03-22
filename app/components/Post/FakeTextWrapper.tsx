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
            Highlight: "I mumble quietly to no one to maybe stop drinking.\""
        },
    });

    return (
        <Template post={post} />
    );

};

export default FakeTextWrapper;