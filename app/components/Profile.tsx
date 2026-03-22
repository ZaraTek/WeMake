import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserListGet } from '../../hooks/useUserListGet';
import { useUserVariable } from '../../hooks/useUserVariable';
import PoppinsText from './ui/text/PoppinsText';
import { UserData } from '../../types/userData';
import AppButton from './ui/buttons/AppButton';
import { UserIcon } from 'lucide-react-native';
import Template from './Post/Templates/Template';
import Column from './layout/Column';

interface ProfileProps {
    currentUserId: string;
    signOut: () => void;
}

const Profile = ({ currentUserId, signOut }: ProfileProps) => {

    const posts = useUserListGet({
        key: "posts",
        userIds: [currentUserId],
    });


    return (
        <ScrollShadow LinearGradientComponent={LinearGradient}>
            <ScrollView>
                <View>
                    <AppButton variant="outline" className="h-14 w-14" onPress={() => signOut()}>
                        <UserIcon size={24} color={"white"} />
                    </AppButton>
                    <PoppinsText weight='medium' color='white'>My Profile</PoppinsText>
                    <PoppinsText weight='medium' color='white'>{`User ID: ${currentUserId}`}</PoppinsText>
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
                </View>
            </ScrollView>
        </ScrollShadow>
    );
};

export default Profile;
