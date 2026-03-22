import React from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import { useUserList } from '../../../hooks/useUserList';
import { useUserListLength } from '../../../hooks/useUserListLength';
import { useUserVariableGet } from '../../../hooks/useUserVariableGet';
import { ProfileData } from '../../../types/profile';

interface PostHeaderProps {
    postId: string;
    userId: string;
}

interface LikeData {
    state: 'liked' | 'not-liked';
}

const formatLikeCount = (count: number): string => {
    if (count >= 1000000) {
        const millions = count / 1000000;
        if (millions >= 10) {
            return Math.floor(millions) + 'M';
        } else {
            return millions.toFixed(1) + 'M';
        }
    } else if (count >= 1000) {
        const thousands = count / 1000;
        if (thousands >= 10) {
            return Math.floor(thousands) + 'K';
        } else {
            return thousands.toFixed(1) + 'K';
        }
    }
    return count.toString();
};

const PostHeader = ({ postId, userId }: PostHeaderProps) => {
    // Get user profile data for the post author
    const userProfiles = useUserVariableGet<ProfileData>({
        key: "profileData",
        userIds: [userId],
    });

    const profile = userProfiles?.[0]?.value;
    const username = profile?.username || 'Anonymous User';
    const pfpUrl = profile?.pfpUrl;

    // Track current user's like status for this post
    const [like, setLike] = useUserList<LikeData>({
        key: "likes",
        itemId: postId,
        privacy: "PUBLIC",
        filterKey: "state",
        defaultValue: { state: "not-liked" },
    });

    // Get total number of likes for this post
    const getNumberOfLikes = useUserListLength({
        key: "likes",
        filterFor: "liked",
        itemId: postId,
    });

    const addLike = () => {
        setLike({ state: "liked" });
    };

    const removeLike = () => {
        setLike({ state: "not-liked" });
    };

    const isLiked = like?.value.state === 'liked';
    const likeCount = getNumberOfLikes || 0;

    return (
        <View className="mb-3 px-4">
            {/* User info section */}
            <View className="mb-3 flex-row items-center gap-2">
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

            {/* Likes section */}
            <View className="flex-row items-center justify-between">
                <View />
                
                <Pressable
                    onPress={isLiked ? removeLike : addLike}
                    className={`rounded-lg w-18 items-center py-2 ${isLiked ? 'bg-red-500' : 'bg-none'} border-2 border-red-500`}
                >
                    <Text className="text-sm font-semibold text-white">
                        {isLiked ? '❤️' : '🤍'} {formatLikeCount(likeCount)}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default PostHeader;
