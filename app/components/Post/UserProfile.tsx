import React from 'react';
import { View, Text, Image } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { useUserVariableGet } from '../../../hooks/useUserVariableGet';
import { ProfileData } from '../../../types/profile';

interface UserProfileProps {
    userId: string;
}

const UserProfile = ({ userId }: UserProfileProps) => {
    // Get user profile data
    const userProfiles = useUserVariableGet<ProfileData>({
        key: "profileData",
        userIds: [userId],
    });

    const profile = userProfiles?.[0]?.value;
    const username = profile?.username || '...';
    const pfpUrl = profile?.pfpUrl;

    // Don't render anything if userProfiles is undefined
    if (!userProfiles) {
        return null;
    }

    return (
        <Animated.View 
            entering={FadeInDown}
            exiting={FadeOutUp}
            className="flex-row items-center gap-2 justify-center"
        >
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
        </Animated.View>
    );
};

export default UserProfile;
