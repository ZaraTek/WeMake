import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useUserVariableGet } from '../../hooks/useUserVariableGet';
import { useUserListGet } from '../../hooks/useUserListGet';
import { useUserVariable } from '../../hooks/useUserVariable';
import type { UserData } from '../../types/userData';
import type { ProfileData } from '../../types/profile';
import type { PostType } from '../../types/postTypes';
import AppButton from './ui/buttons/AppButton';
import Column from './layout/Column';
import PoppinsText from './ui/text/PoppinsText';
import ProfileHeader from './ProfileHeader';
import Template from './Post/Templates/Template';

interface OtherUserProfileProps {
    userId: string;
    onBack: () => void;
    showBackButton?: boolean;
}

const OtherUserProfile = ({ userId, onBack, showBackButton = true }: OtherUserProfileProps) => {
    const [friendsRecord, setFriendsRecord] = useUserVariable<string[]>({
        key: 'friends',
        defaultValue: [],
        privacy: 'PRIVATE',
    });
    const profileRecords = useUserVariableGet<ProfileData>({
        key: 'profileData',
        userIds: [userId],
    });
    const userRecords = useUserVariableGet<UserData>({
        key: 'userData',
        userIds: [userId],
    });
    const posts = useUserListGet<PostType>({
        key: 'posts',
        userIds: [userId],
    });

    const userProfile = profileRecords?.[0]?.value;
    const userData = userRecords?.[0]?.value;
    const fallbackName = userData?.name?.trim() || userProfile?.name?.trim() || 'Mystery Bean';
    const fallbackUsername = userProfile?.username?.trim() || fallbackName.split(/\s+/)[0] || 'beanpal';
    const friendIds = Array.from(new Set((friendsRecord.value ?? []).filter(Boolean)));
    const isFriend = friendIds.includes(userId);
    const toggleFriend = () => {
        if (isFriend) {
            setFriendsRecord(friendIds.filter((friendId) => friendId !== userId));
            return;
        }

        setFriendsRecord([...friendIds, userId]);
    };
    const resolvedProfile = useMemo<ProfileData>(() => ({
        ...userProfile,
        name: userProfile?.name || fallbackName,
        username: fallbackUsername,
    }), [fallbackName, fallbackUsername, userProfile]);

    return (
        <View className="h-full -mt-30">
            <Column gap={4}>
                {true && (
                    <AppButton variant="outline" className="h-12 w-24" onPress={onBack}>
                        <PoppinsText color="white">Back</PoppinsText>
                    </AppButton>
                )}

                <View className=''>
                    <ProfileHeader
                        profileData={resolvedProfile}
                        showEditButtons={false}
                        height={300}
                    />

                    <Column className="px-4 pb-6" gap={4}>
                        <Column gap={0}>
                            <PoppinsText weight="bold" color="white">{fallbackName}</PoppinsText>
                            <PoppinsText varient="subtext" color="white">@{fallbackUsername}</PoppinsText>
                        </Column>

                        <AppButton
                            variant={isFriend ? 'outline' : 'primary'}
                            className="h-12 w-20"
                            onPress={toggleFriend}
                        >
                            <PoppinsText color="white">{isFriend ? 'Following' : 'Follow'}</PoppinsText>
                        </AppButton>

                        <Column>
                            {posts && posts.length > 0 ? posts.map((post, index) => (
                                <View key={post.itemId ?? index}>
                                    {post.value.postTemplate === 'Image' && !post.value.imageTemplateVersion ? (
                                        <>
                                            <PoppinsText color="white">NO imageTemplateVersion</PoppinsText>
                                            <PoppinsText color="white">{JSON.stringify(post.value)}</PoppinsText>
                                        </>
                                    ) : (
                                        <Template post={post.value} />
                                    )}
                                </View>
                            )) : (
                                <View className="rounded-3xl border border-dashed border-border px-4 py-6">
                                    <PoppinsText weight="medium" color="white">No posts yet!</PoppinsText>
                                    {/* <PoppinsText varient="subtext" color="white">No posts here yet, but the follow button is ready for destiny.</PoppinsText> */}
                                </View>
                            )}
                        </Column>
                    </Column>
                </View>
            </Column>
        </View>
    );
};

export default OtherUserProfile;
