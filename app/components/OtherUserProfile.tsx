import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
import PostDialog from './PostDialog';

type ClerkAuthSnapshot = {
    isLoaded: boolean;
    isSignedIn: boolean | undefined;
    getToken: (options: { template?: 'convex'; skipCache?: boolean }) => Promise<string | null>;
    orgId: string | undefined | null;
    orgRole: string | undefined | null;
};

interface OtherUserProfileProps {
    userId: string;
    currentUserId: string;
    auth: ClerkAuthSnapshot;
    onBack: () => void;
    showBackButton?: boolean;
}

const OtherUserProfile = ({ userId, currentUserId, auth, onBack, showBackButton = true }: OtherUserProfileProps) => {
    const [friendsRecord, setFriendsRecord] = useUserVariable<string[]>({
        key: 'friends',
        defaultValue: [],
        privacy: 'PRIVATE',
    });
    const [selectedPost, setSelectedPost] = useState<{ post: PostType; postId: string } | null>(null);
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
    const handleOpenPost = (post: PostType, postId: string) => {
        setSelectedPost({ post, postId });
    };

    return (
        <>
            <View className="h-full -mt-30">
                <Column gap={4}>
                    {showBackButton && (
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
                                {posts && posts.length > 0 ? posts.map((post, index) => {
                                    const postId = post?.itemId ?? 'ID';
                                    const postValue = post?.value as PostType;

                                    return (
                                        <TouchableOpacity key={post.itemId ?? index} activeOpacity={0.9} onPress={() => handleOpenPost(postValue, postId)}>
                                            <View pointerEvents='none'>
                                                {post.value.postTemplate === 'Image' && !post.value.imageTemplateVersion ? (
                                                    <>
                                                        <PoppinsText color="white">NO imageTemplateVersion</PoppinsText>
                                                        <PoppinsText color="white">{JSON.stringify(post.value)}</PoppinsText>
                                                    </>
                                                ) : (
                                                    <Template post={post.value} />
                                                )}
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }) : (
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

            <PostDialog
                isOpen={selectedPost !== null}
                onOpenChange={(open: boolean) => !open && setSelectedPost(null)}
                post={selectedPost?.post ?? null}
                postId={selectedPost?.postId ?? null}
                userId={userId}
                currentUserId={currentUserId}
                auth={auth}
            />
        </>
    );
};

export default OtherUserProfile;
