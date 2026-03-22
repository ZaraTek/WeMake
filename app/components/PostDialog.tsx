import React from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import ConvexDialog from './ui/dialog/ConvexDialog';
import AppButton from './ui/buttons/AppButton';
import PoppinsText from './ui/text/PoppinsText';
import PostTopRow from './Post/PostTopRow';
import PostWrapper from './Post/PostWrapper';
import DeletePostButton from './Post/DeletePostButton';
import { PostType } from '../../types/postTypes';
import { ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import Column from './layout/Column';

type ClerkAuthSnapshot = {
    isLoaded: boolean;
    isSignedIn: boolean | undefined;
    getToken: (options: { template?: 'convex'; skipCache?: boolean }) => Promise<string | null>;
    orgId: string | undefined | null;
    orgRole: string | undefined | null;
};

interface PostDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    post: PostType | null;
    postId: string | null;
    userId: string;
    currentUserId?: string;
    auth: ClerkAuthSnapshot;
}

const PostDialog = ({ isOpen, onOpenChange, post, postId, userId, currentUserId, auth }: PostDialogProps) => {
    return (
        <ConvexDialog.Root isOpen={isOpen} onOpenChange={onOpenChange}>
            <ConvexDialog.Portal className='justify-center items-center'>
                <ConvexDialog.Overlay />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ConvexDialog.Content auth={auth} className="h-[70vh] w-[95vw] rounded-2xl max-w-none border-0 px-0 py-0">
                        <View className="absolute top-2 right-2 z-50">
                            <View className="flex-row items-center justify-end">
                                <AppButton onPress={() => onOpenChange(false)} className="w-12" variant="transparent">
                                    <PoppinsText color="white">✕</PoppinsText>
                                </AppButton>
                            </View>
                        </View>

                        <ScrollShadow LinearGradientComponent={LinearGradient}>
                            <ScrollView className="pt-10" style={{ height: '100%' }}>
                                <View className="">
                                    {post && postId ? (
                                        <Column>
                                            <PostTopRow postId={postId} userId={userId} />
                                            <PostWrapper post={post} postId={postId} userId={userId} />
                                        </Column>
                                    ) : null}
                                </View>
                                {postId && currentUserId === userId ? <DeletePostButton postId={postId} onDeleted={() => onOpenChange(false)} /> : null}
                            </ScrollView>
                        </ScrollShadow>
                    </ConvexDialog.Content>
                </KeyboardAvoidingView>
            </ConvexDialog.Portal>
        </ConvexDialog.Root>
    );
};

export default PostDialog;
