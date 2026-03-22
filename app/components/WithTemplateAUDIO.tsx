import React, { useState } from 'react';
import { View, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserListSet } from '../../hooks/useUserListSet';
import type { AudioPost, PostType } from '../../types/postTypes';
import Template from './Post/Templates/Template';
import AppButton from './ui/buttons/AppButton';
import StatusButton from './ui/StatusButton';
import PoppinsText from './ui/text/PoppinsText';
import Column from './layout/Column';
import AnimatedWrapper from './ui/AnimatedWrapper';
import DateFieldDialog from './ui/dialog/DateFieldDialog';
import { Dialog } from 'heroui-native';
import MultiImageUpload from './ui/imageUpload/MultiImageUpload';

interface WithTemplateAUDIOProps {
    title: string;
    onBackToFeed?: () => void;
}

const WithTemplateAUDIO: React.FC<WithTemplateAUDIOProps> = ({ title, onBackToFeed }) => {
    const [subtitle, setSubtitle] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [writeUpData, setWriteUpData] = useState('');
    const [navigationDirection, setNavigationDirection] = useState<'forward' | 'backward'>('forward');
    const [profileDate, setProfileDate] = useState(() => {
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const year = today.getFullYear();
        return `${month}/${day}/${year}`;
    });
    
    // Dialog states
    const [isSubtitleDialogOpen, setIsSubtitleDialogOpen] = useState(false);
    const [isAudioUrlDialogOpen, setIsAudioUrlDialogOpen] = useState(false);
    const [isWriteUpDialogOpen, setIsWriteUpDialogOpen] = useState(false);
    const [isProfileDateDialogOpen, setIsProfileDateDialogOpen] = useState(false);
    
    const setPost = useUserListSet<PostType>();

    const isValid = title.trim().length > 0 && audioUrl.trim().length > 0;

    // Dialog handlers
    const handleOpenSubtitleDialog = () => setIsSubtitleDialogOpen(true);
    const handleCloseSubtitleDialog = () => setIsSubtitleDialogOpen(false);
    const handleSubtitlePost = () => setIsSubtitleDialogOpen(false);
    
    const handleOpenAudioUrlDialog = () => setIsAudioUrlDialogOpen(true);
    const handleCloseAudioUrlDialog = () => setIsAudioUrlDialogOpen(false);
    const handleAudioUrlPost = () => setIsAudioUrlDialogOpen(false);
    
    const handleOpenWriteUpDialog = () => setIsWriteUpDialogOpen(true);
    const handleCloseWriteUpDialog = () => setIsWriteUpDialogOpen(false);
    const handleWriteUpPost = () => setIsWriteUpDialogOpen(false);

    const handleOpenProfileDateDialog = () => setIsProfileDateDialogOpen(true);
    const handleCloseProfileDateDialog = () => setIsProfileDateDialogOpen(false);

    // Dynamic height calculations
    const getSubtitleInputHeight = () => {
        const lines = subtitle.split('\n').length;
        const baseHeight = 40;
        const lineHeight = 20;
        const maxHeight = 80;
        return Math.min(baseHeight + (lines - 1) * lineHeight, maxHeight);
    };

    const getWriteUpInputHeight = () => {
        const lines = writeUpData.split('\n').length;
        const baseHeight = 40;
        const lineHeight = 20;
        const maxHeight = 120;
        return Math.min(baseHeight + (lines - 1) * lineHeight, maxHeight);
    };

    const post: AudioPost = {
        postTemplate: 'Audio',
        TemplateData: {
            Title: title || 'Untitled Project',
            Subtitle: subtitle || undefined,
            AudioUrl: audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            CoverImageUrl: coverImageUrl || undefined,
            profileDate: profileDate,
        },
        writeUpData: writeUpData || undefined,
    };

    const resetForm = () => {
        setSubtitle('');
        setAudioUrl('');
        setCoverImageUrl('');
        setWriteUpData('');
        setProfileDate(() => {
            const today = new Date();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            const year = today.getFullYear();
            return `${month}/${day}/${year}`;
        });
    };

    const submitPost = (postValue: AudioPost) => {
        const postId = Math.floor(Math.random() * 1000000000).toString();

        setPost({
            key: 'posts',
            itemId: postId,
            value: postValue,
            privacy: 'PUBLIC',
            searchKeys: ['title', 'subtitle', 'audioUrl', 'writeUpData', 'profileDate'],
        });

        resetForm();
        if (onBackToFeed) {
            onBackToFeed();
        }
    };

    const handleAddPost = () => {
        if (!isValid) return;

        submitPost({
            postTemplate: 'Audio',
            TemplateData: {
                Title: title,
                Subtitle: subtitle || undefined,
                AudioUrl: audioUrl,
                CoverImageUrl: coverImageUrl || undefined,
                profileDate: profileDate,
            },
            writeUpData: writeUpData || undefined,
        });
    };

    return (
        <>
        <AnimatedWrapper direction={navigationDirection}>
            <View className='p-4 h-full overflow-clip'>
                <View className='border-b border-subtle-border pb-4'>
                    <Template post={post} />
                </View>
                <ScrollShadow LinearGradientComponent={LinearGradient}>
                    <ScrollView className='h-[60vh]'>
                        <Column className='mt-6 gap-4 pb-10 mb-30'>
                            <PoppinsText className='text-primary-text text-xl font-bold'>{title}</PoppinsText>
                            
                            <Pressable
                                onPress={handleOpenSubtitleDialog}
                                className='p-4 border border-subtle-border rounded-lg bg-inner-background'
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                            >
                                <PoppinsText className='text-muted-text'>
                                    {subtitle.trim() ? subtitle : 'Subtitle'}
                                </PoppinsText>
                            </Pressable>
                            
                            <Pressable
                                onPress={handleOpenAudioUrlDialog}
                                className='p-4 border border-subtle-border rounded-lg bg-inner-background'
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                            >
                                <PoppinsText className='text-muted-text'>
                                    {audioUrl.trim() ? audioUrl : 'Audio URL'}
                                </PoppinsText>
                            </Pressable>
                            <MultiImageUpload
                                imageUrls={coverImageUrl ? [coverImageUrl] : []}
                                setImageUrls={(urls) => setCoverImageUrl(urls[0] ?? '')}
                                buttonLabel='Add Cover Image'
                                emptyLabel='Start by adding your cover image!'
                                maxImages={1}
                            />
                            
                            <Pressable
                                onPress={handleOpenProfileDateDialog}
                                className='p-4 border border-subtle-border rounded-lg bg-inner-background'
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                            >
                                <PoppinsText className='text-muted-text'>
                                    {profileDate.trim() ? profileDate : 'Project Date'}
                                </PoppinsText>
                            </Pressable>
                            
                            <Pressable
                                onPress={handleOpenWriteUpDialog}
                                className='p-4 border border-subtle-border rounded-lg bg-inner-background'
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                            >
                                <PoppinsText className='text-muted-text'>
                                    {writeUpData.trim() ? writeUpData.substring(0, 100) + (writeUpData.length > 100 ? '...' : '') : 'Write up content'}
                                </PoppinsText>
                            </Pressable>
                            {isValid ? (
                                <AppButton variant='primary' className='w-full' onPress={handleAddPost}>
                                    <PoppinsText weight='medium'>{`Create Post`}</PoppinsText>
                                </AppButton>
                            ) : (
                                <StatusButton buttonText='Create Post' buttonAltText='REQUIRED' className='w-full' />
                            )}
                        </Column>
                    </ScrollView>
                </ScrollShadow>
            </View>
        </AnimatedWrapper>
        
        {/* Subtitle Dialog */}
        <Dialog isOpen={isSubtitleDialogOpen} onOpenChange={handleCloseSubtitleDialog}>
            <Dialog.Portal className='bg-black/50'>
                <Dialog.Overlay />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Dialog.Content className="w-[90vw] max-w-[500px] bg-background">
                        <Dialog.Close className='bg-grey' />
                        <View className="flex-row items-center gap-2">
                            <TextInput
                                ref={(input) => {
                                    if (input && isSubtitleDialogOpen) {
                                        setTimeout(() => input.focus(), 100);
                                    }
                                }}
                                value={subtitle}
                                onChangeText={setSubtitle}
                                placeholder='Subtitle'
                                className="flex-1 rounded-lg border border-subtle-border bg-inner-background px-3 py-2 text-text"
                                style={{ height: getSubtitleInputHeight() }}
                            />
                            <Pressable
                                onPress={handleSubtitlePost}
                                className="rounded-lg bg-blue-500 px-4 py-2"
                            >
                                <Text className="text-white font-semibold">Post</Text>
                            </Pressable>
                        </View>
                    </Dialog.Content>
                </KeyboardAvoidingView>
            </Dialog.Portal>
        </Dialog>
        
        {/* Audio URL Dialog */}
        <Dialog isOpen={isAudioUrlDialogOpen} onOpenChange={handleCloseAudioUrlDialog}>
            <Dialog.Portal className='bg-black/50'>
                <Dialog.Overlay />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Dialog.Content className="w-[90vw] max-w-[500px] bg-background">
                        <Dialog.Close className='bg-grey' />
                        <View className="flex-row items-center gap-2">
                            <TextInput
                                ref={(input) => {
                                    if (input && isAudioUrlDialogOpen) {
                                        setTimeout(() => input.focus(), 100);
                                    }
                                }}
                                value={audioUrl}
                                onChangeText={setAudioUrl}
                                placeholder='Audio URL'
                                autoCapitalize='none'
                                autoCorrect={false}
                                className="flex-1 rounded-lg border border-subtle-border bg-inner-background px-3 py-2 text-text"
                            />
                            <Pressable
                                onPress={handleAudioUrlPost}
                                className="rounded-lg bg-blue-500 px-4 py-2"
                            >
                                <Text className="text-white font-semibold">Post</Text>
                            </Pressable>
                        </View>
                    </Dialog.Content>
                </KeyboardAvoidingView>
            </Dialog.Portal>
        </Dialog>
        
        {/* Write Up Dialog */}
        <Dialog isOpen={isWriteUpDialogOpen} onOpenChange={handleCloseWriteUpDialog}>
            <Dialog.Portal className='bg-black/50'>
                <Dialog.Overlay />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Dialog.Content className="w-[90vw] max-w-[500px] bg-background">
                        <Dialog.Close className='bg-grey' />
                        <View className="flex-row items-center gap-2">
                            <TextInput
                                ref={(input) => {
                                    if (input && isWriteUpDialogOpen) {
                                        setTimeout(() => input.focus(), 100);
                                    }
                                }}
                                value={writeUpData}
                                onChangeText={setWriteUpData}
                                placeholder='Write up content'
                                multiline
                                textAlignVertical="top"
                                className="flex-1 min-h-28 rounded-lg border border-subtle-border bg-inner-background px-3 py-2 text-text"
                                style={{ height: getWriteUpInputHeight() }}
                            />
                            <Pressable
                                onPress={handleWriteUpPost}
                                className="rounded-lg bg-blue-500 px-4 py-2"
                            >
                                <Text className="text-white font-semibold">Post</Text>
                            </Pressable>
                        </View>
                    </Dialog.Content>
                </KeyboardAvoidingView>
            </Dialog.Portal>
        </Dialog>

        <DateFieldDialog
            isOpen={isProfileDateDialogOpen}
            onOpenChange={handleCloseProfileDateDialog}
            value={profileDate}
            onChangeText={setProfileDate}
            placeholder='Project Date'
        />
        </>
    );
};

export default WithTemplateAUDIO;
