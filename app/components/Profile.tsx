import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
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

interface ProfileProps {
    currentUserId: string;
    currentUserName?: string;
    signOut: () => void;
}

const Profile = ({ currentUserId, currentUserName, signOut }: ProfileProps) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const posts = useUserListGet({
        key: "posts",
        userIds: [currentUserId],
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
        const currentUsername = profileData?.value?.username;

        if (!firstName) {
            return;
        }

        const shouldSyncUsername = !currentUsername || currentUsername === currentUserName;

        if (!shouldSyncUsername || currentUsername === firstName) {
            return;
        }

        if (currentUsername !== firstName) {
            setProfileData({
                ...profileData?.value,
                username: firstName
            });
        }
    }, [currentUserName, profileData.state.isSyncing, profileData?.value?.username]);

    const handleEditProfile = () => {
        setIsEditDialogOpen(true);
    };

    const handleProfileSave = (updatedProfile: ProfileData) => {
        setProfileData(updatedProfile);
    };

    const handleLoadingChange = (loading: boolean) => {
        setIsLoading(loading);
    };

    // import type { ProfileData } from "../../types/profile";


    return (
        <>
            <View className='-translate-y-20'>
                <ScrollShadow LinearGradientComponent={LinearGradient} >
                    <ScrollView className='h-screen'>
                        <View>
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
                                height={300}
                            />
                            <Column className='px-4'>
                                <AppButton variant="outline" className="h-12 w-30" onPress={() => signOut()}>
                                    <PoppinsText>Sign Out</PoppinsText>
                                </AppButton>

                                <Column>
                                    {posts?.map((post: any, index: number) => {
                                        const text = post?.value?.text ?? 'HELLO';
                                        const postId = post?.itemId ?? 'ID';

                                        return (
                                            <View key={index}>

                                                {post.value.postTemplate === 'Image' && !post.value.imageTemplateVersion ? (
                                                    <>
                                                        <PoppinsText>NO imageTemplateVersion</PoppinsText>
                                                        <PoppinsText>{JSON.stringify(post.value)}</PoppinsText>
                                                    </>
                                                ) : (
                                                    <Template post={post.value} />
                                                )}
                                            </View>
                                            // <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                                            //     <PoppinsText weight='medium' color='white'>Post ID: {postId}</PoppinsText>
                                            //     <PoppinsText weight='medium' color='white'>{text}</PoppinsText>
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
                profileData={profileData?.value}
                onSave={handleProfileSave}
                onLoadingChange={handleLoadingChange}
            />
        </>
    );
};

export default Profile;
