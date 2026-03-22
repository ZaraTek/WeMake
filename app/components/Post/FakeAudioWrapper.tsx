import { useState } from "react";
import Template from "./Templates/Template";
import type { PostType } from "../../../types/postTypes";

const FakeAudioWrapper = () => {
    const [post] = useState<PostType>({
        postTemplate: 'Audio',
        TemplateData: {
            AudioUrl: 'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTGu0B8vlwuXsUgBd3nRZzhH6NG28iT79YaPyx',
            Title: 'Enchanted (Zara\'s Version)',
            Subtitle: 'The Intersection',
            CoverImageUrl: 'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTIQOimHBZCML6oWkKz5hGfRsDFAO8UBPtwES3'
        },
    });

    return <Template post={post} />;
};

export default FakeAudioWrapper;