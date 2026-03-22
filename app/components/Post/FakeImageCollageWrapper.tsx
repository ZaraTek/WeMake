import { useState } from "react";
import Template from "./Templates/Template";
import type { PostType } from "../../../types/postTypes";

const FakeImageCollageWrapper = () => {
    const [post] = useState<PostType>({
        postTemplate: "Image",
        TemplateData: {
            ImageUrl: ["https://m.media-amazon.com/images/M/MV5BYjU3MjVlODgtNGM4ZC00MzI1LWJlNTgtNzUzZmRhMWE2ZTNmXkEyXkFqcGc@._V1_.jpg, ", "https://i.ytimg.com/vi/JQ-6Cm1Dq6c/maxresdefault.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT31BtgM3my1s50MIHv5lWwk21eOExbpVbR2A&s"],
            Title: "Haunted on the Lake",
            Subtitle: "Photos from Quadeca's I Didn't Mean to Haunt You Music Visualizer",
        },
        imageTemplateVersion: "collage",
    } as const);

    return <Template post={post} />;
};

export default FakeImageCollageWrapper;