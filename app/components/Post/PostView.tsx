import { Text, TextInput, View, ScrollView } from "react-native"
import { Comments } from "../../../types/postContainerTypes"
import { Comment } from "../../../types/postContainerTypes"
import { PostType } from "types/postTypes";
import Template from "./Templates/Template";
import React from "react";

interface PostViewProps {
    post: PostType;
    comments: Comments;
    userId: string;
}

const PostView = ({ post, comments, userId }: PostViewProps) => {
    return (
        <ScrollView className="mx-4">
            <Template post={post} />
            <TextInput
                value={post.writeUpData ?? ""}
                placeholder="No write-up content"
                placeholderTextColor="#888888"
                editable={false}
                multiline
                textAlignVertical="top"
                className="mt-3 min-h-24 rounded-lg border border-subtle-border bg-inner-background px-3 py-2.5 text-text"
            />

            <View className="mt-4 rounded-lg border border-subtle-border bg-inner-background p-3">
                <Text className="mb-2 text-base font-semibold text-text">Comments</Text>

                {comments.length === 0 ? (
                    <Text className="text-sm text-muted-text">No comments yet.</Text>
                ) : (
                    comments.map((comment: Comment, index: number) => (
                        <View
                            key={`${comment.postId}-${index}`}
                            className="mb-2 rounded-md border border-subtle-border bg-background px-3 py-2"
                        >
                            <Text className="text-sm text-text">{comment.body}</Text>
                        </View>
                    ))
                )}
            </View>
        </ScrollView>
    )
}

export default PostView