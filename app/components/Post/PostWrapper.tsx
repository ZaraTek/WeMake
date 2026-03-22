import React from 'react';
import { useUserListGet } from '../../../hooks/useUserListGet';
import { useUserListSet } from '../../../hooks/useUserListSet';
import PostView from './PostView';
import { PostType } from 'types/postTypes';
import { Comment } from '../../../types/postContainerTypes';

interface PostWrapperProps {
    post: PostType;
    postId: string;
    userId: string;
}

interface CommentData {
    body: string;
    postId: string;
}

const PostWrapper = ({ post, postId, userId }: PostWrapperProps) => {
    // Get comments for this specific post using the same pattern as social media app
    const commentsOnActivePost = useUserListGet<CommentData>({
        key: 'comments',
        filterFor: postId,
    });

    const setUserList = useUserListSet();

    const addComment = (textInComment: string) => {
        const randomId = Math.floor(Math.random() * 1000000000);

        const commentData: CommentData = {
            body: textInComment,
            postId: postId,
        };

        setUserList({
            key: 'comments',
            itemId: randomId.toString(),
            value: commentData,
            privacy: 'PUBLIC',
            filterKey: 'postId',
        });
    };

    // Transform the comments data to match the expected Comments type
    const comments: Comment[] = commentsOnActivePost?.map((comment: any) => ({
        body: comment.value.body,
        postId: comment.value.postId,
        userId: comment.userToken,
    })) || [];

    return (
        <PostView 
            post={post} 
            comments={comments} 
            userId={userId}
            postId={postId}
            onAddComment={addComment}
        />
    );
};

export default PostWrapper;
