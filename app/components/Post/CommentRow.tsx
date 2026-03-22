import React from 'react';
import { View, Text, Image } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { useUserVariableGet } from '../../../hooks/useUserVariableGet';
import { Comment } from '../../../types/postContainerTypes';
import { ProfileData } from '../../../types/profile';

interface CommentRowProps {
    comment: Comment;
}

const CommentRow = ({ comment }: CommentRowProps) => {
    // Get user profile data for this comment
    const userProfiles = useUserVariableGet<ProfileData>({
        key: "profileData",
        userIds: comment.userId ? [comment.userId] : [],
    });

    const profile = userProfiles?.[0]?.value;
    const username = profile?.username || 'Anonymous User';
    const pfpUrl = profile?.pfpUrl;

    // Don't render anything if userProfiles is undefined
    if (!userProfiles) {
        return null;
    }

    return (
        <Animated.View 
            entering={FadeInDown}
            exiting={FadeOutUp}
            className="mb-3 rounded-md border border-subtle-border bg-background p-3"
        >
            {/* User info section */}
            <View className="mb-2 flex-row items-center gap-2">
                {pfpUrl ? (
                    <Image 
                        source={{ uri: pfpUrl }} 
                        className="h-8 w-8 rounded-full"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="h-8 w-8 rounded-full bg-gray-400" />
                )}
                <Text className="text-sm font-semibold text-text">{username}</Text>
            </View>
            
            {/* Comment body */}
            <Text className="text-sm text-text">{comment.body}</Text>
        </Animated.View>
    );
};

export default CommentRow;
