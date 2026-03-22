import { Text, TextInput, View, ScrollView, Pressable } from "react-native"
import { Comments } from "../../../types/postContainerTypes"
import { Comment } from "../../../types/postContainerTypes"
import { PostType } from "types/postTypes";
import Template from "./Templates/Template";
import CommentRow from "./CommentRow";
import React, { useState } from "react";

interface PostViewProps {
    post: PostType;
    comments: Comments;
    userId: string;
    postId: string;
    onAddComment: (text: string) => void;
}

const PostView = ({ post, comments, userId, postId, onAddComment }: PostViewProps) => {
    const [comment, setComment] = useState('');

    const handleAddComment = () => {
        if (comment.trim()) {
            onAddComment(comment);
            setComment('');
        }
    };

    return (
        <ScrollView className="mx-4">
            <Template post={post} />
            {post.writeUpData && post.writeUpData.trim() !== "" && (
                <TextInput
                    value={post.writeUpData}
                    placeholder="No write-up content"
                    placeholderTextColor="#888888"
                    editable={false}
                    multiline
                    textAlignVertical="top"
                    className="mt-3 min-h-24 rounded-lg border border-subtle-border bg-inner-background px-3 py-2.5 text-text"
                />
            )}

            <View className="mt-4 rounded-lg border border-subtle-border bg-inner-background p-3">
                <Text className="mb-2 text-base font-semibold text-text">Comments</Text>

                {/* Comment input */}
                <View className="mb-3 flex-row items-center gap-2">
                    <TextInput
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Add a comment..."
                        placeholderTextColor="#888888"
                        multiline
                        className="flex-1 rounded-lg border border-subtle-border bg-background px-3 py-2 text-text"
                    />
                    <Pressable
                        onPress={handleAddComment}
                        className="rounded-lg bg-blue-500 px-4 py-2"
                    >
                        <Text className="text-white font-semibold">Post</Text>
                    </Pressable>
                </View>

                {comments.length === 0 ? (
                    <Text className="text-sm text-muted-text">No comments yet.</Text>
                ) : (
                    comments.map((comment: Comment, index: number) => (
                        <CommentRow 
                            key={`${comment.postId}-${index}`}
                            comment={comment}
                        />
                    ))
                )}
            </View>
        </ScrollView>
    )
}

export default PostView