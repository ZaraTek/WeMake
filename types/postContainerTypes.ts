import { PostType } from "./postTypes"


export type Comments = Comment[]

export type Comment = {
    body: string,
    postId: string
}

