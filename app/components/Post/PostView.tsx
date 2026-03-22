import { Text, TextInput, View, ScrollView, Pressable, KeyboardAvoidingView, Platform } from "react-native"
import { Comments } from "../../../types/postContainerTypes"
import { Comment } from "../../../types/postContainerTypes"
import { PostType } from "types/postTypes";
import Template from "./Templates/Template";
import CommentRow from "./CommentRow";
import React, { useState } from "react";
import { Dialog } from 'heroui-native';
import AppButton from '../ui/buttons/AppButton';
import StatusButton from '../ui/StatusButton';
import PoppinsText from '../ui/text/PoppinsText';

interface PostViewProps {
    post: PostType;
    comments: Comments;
    userId: string;
    postId: string;
    onAddComment: (text: string) => void;
}

const PostView = ({ post, comments, userId, postId, onAddComment }: PostViewProps) => {
    const [comment, setComment] = useState('');
    const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

    // Calculate dynamic height based on content
    const getInputHeight = () => {
        const lines = comment.split('\n').length;
        const baseHeight = 40;
        const lineHeight = 20;
        const maxHeight = 120;
        return Math.min(baseHeight + (lines - 1) * lineHeight, maxHeight);
    };

    const handleAddComment = () => {
        if (comment.trim()) {
            onAddComment(comment);
            setComment('');
            setIsCommentDialogOpen(false);
        }
    };

    return (
        <>
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

                    <View className="mb-3 flex-row items-center gap-2">
                        <Pressable
                            onPress={() => setIsCommentDialogOpen(true)}
                            className="flex-1 rounded-lg border border-subtle-border bg-inner-background px-3 py-2"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                        >
                            <Text className="text-muted-text">Add a comment...</Text>
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

            <Dialog isOpen={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
                <Dialog.Portal className='bg-black/50'>
                    <Dialog.Overlay />
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <Dialog.Content className="w-[90vw] max-w-[500px] bg-background">
                            <Dialog.Close className='bg-grey' />
                            <View className="flex-row items-center gap-2">
                                <TextInput
                                    ref={(input) => {
                                        if (input && isCommentDialogOpen) {
                                            setTimeout(() => input.focus(), 100);
                                        }
                                    }}
                                    value={comment}
                                    onChangeText={setComment}
                                    placeholder="Add a comment..."
                                    placeholderTextColor="#888888"
                                    multiline
                                    textAlignVertical="top"
                                    className="flex-1 rounded-lg border border-subtle-border bg-inner-background px-3 py-2 text-text"
                                    style={{ height: getInputHeight() }}
                                />
                                {comment.trim() ? (
                                    <Pressable
                                        onPress={handleAddComment}
                                        className="rounded-lg bg-blue-500 px-4 py-2"
                                    >
                                        <Text className="text-white font-semibold">Post</Text>
                                    </Pressable>
                                ) : (
                                    <StatusButton buttonText="Post" buttonAltText="REQUIRED" className="px-4" />
                                )}
                            </View>
                        </Dialog.Content>
                    </KeyboardAvoidingView>
                </Dialog.Portal>
            </Dialog>
        </>
    )
}

export default PostView