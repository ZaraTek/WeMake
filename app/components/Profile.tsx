import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserListGet } from '../../hooks/useUserListGet';
import { useUserVariable } from '../../hooks/useUserVariable';
import PoppinsText from './ui/text/PoppinsText';
import { UserData } from '../../types/userData';
import { ProfileData } from '../../types/profile';
import AppButton from './ui/buttons/AppButton';
import { UserIcon } from 'lucide-react-native';
import Template from './Post/Templates/Template';
import Column from './layout/Column';
import ProfileHeader from './ProfileHeader';
import ProfileEditDialog from './ui/dialog/ProfileEditDialog';
import PostDialog from './PostDialog';
import { PostType } from '../../types/postTypes';

type ClerkAuthSnapshot = {
    isLoaded: boolean;
    isSignedIn: boolean | undefined;
    getToken: (options: { template?: 'convex'; skipCache?: boolean }) => Promise<string | null>;
    orgId: string | undefined | null;
    orgRole: string | undefined | null;
};

interface ProfileProps {
    currentUserId: string;
    currentUserName?: string;
    signOut: () => void;
    auth: ClerkAuthSnapshot;
}

const Profile = ({ currentUserId, currentUserName, signOut, auth }: ProfileProps) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState<{ post: PostType; postId: string } | null>(null);

    const posts = useUserListGet({
        key: "posts",
        userIds: [currentUserId],
    });

    const [userData] = useUserVariable<UserData>({
        key: "userData",
        privacy: "PUBLIC",
    });

    const [profileData, setProfileData] = useUserVariable<ProfileData>({
        key: "profileData",
        privacy: "PUBLIC",
        //   filterKey: "username", // exact filter key
        //   searchKeys: ["username", "name"], // search source keys

    });

    useEffect(() => {
        if (profileData.state.isSyncing) {
            return;
        }

        if (!currentUserName) {
            return;
        }

        const firstName = currentUserName.trim().split(/\s+/)[0];
        const currentUsername = profileData?.value?.username?.trim();

        if (!firstName) {
            return;
        }

        if (currentUsername) {
            return;
        }

        setProfileData({
            ...profileData?.value,
            username: firstName
        });
    }, [currentUserName, profileData.state.isSyncing, profileData?.value?.username]);

    const handleEditProfile = () => {
        setIsEditDialogOpen(true);
    };

    const handleLoadingChange = (loading: boolean) => {
        setIsLoading(loading);
    };

    const handleOpenPost = (post: PostType, postId: string) => {
        setSelectedPost({ post, postId });
    };

    // import type { ProfileData } from "../../types/profile";


    return (
        <>
            <View className='-translate-y-20'>
                <ScrollShadow LinearGradientComponent={LinearGradient} >
                    <ScrollView className='h-screen'>
                        <View className='mb-20'>
                            {isLoading && (
                                <View className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
                                    <PoppinsText className="text-white text-lg">Loading...</PoppinsText>
                                </View>
                            )}
                            <ProfileHeader
                                profileData={profileData?.value}
                                showEditButtons={true}
                                onEditPfp={handleEditProfile}
                                onEditBanner={handleEditProfile}
                                height={350}
                            />
                            <Column className='px-4'>
                                {userData?.value?.email ? (
                                    <PoppinsText className="text-sm text-muted-text mb-3">
                                        {userData.value.email}
                                    </PoppinsText>
                                ) : null}

                                <AppButton variant="outline" className="h-12 w-30" onPress={() => signOut()}>
                                    <PoppinsText>Sign Out</PoppinsText>
                                </AppButton>

                                <Column>
                                    {posts?.map((post: any, index: number) => {
                                        const postId = post?.itemId ?? 'ID';
                                        const postValue = post?.value as PostType;

                                        return (
                                            <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => handleOpenPost(postValue, postId)}>
                                                <View pointerEvents='none'>

                                                    {post.value.postTemplate === 'Image' && !post.value.imageTemplateVersion ? (
                                                        <>
                                                            <PoppinsText>NO imageTemplateVersion</PoppinsText>
                                                            <PoppinsText>{JSON.stringify(post.value)}</PoppinsText>
                                                        </>
                                                    ) : (
                                                        <Template post={postValue} />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                            // <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                                            //     <PoppinsText weight='medium' color='white'>Post ID: {postId}</PoppinsText>
                                            //     <PoppinsText weight='medium' color='white'>{post?.value?.text ?? 'HELLO'}</PoppinsText>
                                            // </View>

                                        );

                                    })}
                                </Column>
                            </Column>
                        </View>
                    </ScrollView>
                </ScrollShadow>
            </View>

            <ProfileEditDialog
                isOpen={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                onLoadingChange={handleLoadingChange}
            />

            <PostDialog
                isOpen={selectedPost !== null}
                onOpenChange={(open: boolean) => !open && setSelectedPost(null)}
                post={selectedPost?.post ?? null}
                postId={selectedPost?.postId ?? null}
                userId={currentUserId}
                auth={auth}
            />
        </>
    );
};

export default Profile;
