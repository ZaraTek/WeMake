import { PowerSquare } from "lucide-react-native"
import React, { useState } from "react"
import { Comments } from "types/postContainerTypes";
import { PostType } from "types/postTypes";
import PostView from "./PostView";

const FakePostView = () => {

    const [post] = useState<PostType>({
            postTemplate: "Image",
            TemplateData: {
                ImageUrl: ["https://m.media-amazon.com/images/M/MV5BYjU3MjVlODgtNGM4ZC00MzI1LWJlNTgtNzUzZmRhMWE2ZTNmXkEyXkFqcGc@._V1_.jpg, ", "https://i.ytimg.com/vi/JQ-6Cm1Dq6c/maxresdefault.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT31BtgM3my1s50MIHv5lWwk21eOExbpVbR2A&s"],
                Title: "Haunted on the Lake",
                Subtitle: "Photos from Quadeca's I Didn't Mean to Haunt You Music Visualizer",
            },
            imageTemplateVersion: "collage",
            writeUpData: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
        } as const);
    

    const comments:Comments = [
        {body:"hi", postId:"1234"}
    ]
    
    return <PostView post={post} comments={comments} userId={"userId"} />
}

export default FakePostView