import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserListSet } from '../../hooks/useUserListSet';
import type { PostType, VideoPost } from '../../types/postTypes';
import Template from './Post/Templates/Template';
import AppButton from './ui/buttons/AppButton';
import StatusButton from './ui/StatusButton';
import PoppinsText from './ui/text/PoppinsText';
import Column from './layout/Column';
import DateFieldDialog from './ui/dialog/DateFieldDialog';
import TextFieldDialog from './ui/dialog/TextFieldDialog';
import WriteUpDialog from './ui/dialog/WriteUpDialog';
import AnimatedWrapper from './ui/AnimatedWrapper';
import MultiImageUpload from './ui/imageUpload/MultiImageUpload';

interface WithTemplateVIDEOProps {
    title: string;
    onBackToFeed?: () => void;
}

const WithTemplateVIDEO: React.FC<WithTemplateVIDEOProps> = ({ title, onBackToFeed }) => {
    const [subtitle, setSubtitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [writeUpData, setWriteUpData] = useState('');
    const [isSubtitleDialogOpen, setIsSubtitleDialogOpen] = useState(false);
    const [isVideoUrlDialogOpen, setIsVideoUrlDialogOpen] = useState(false);
    const [isPreviewUrlDialogOpen, setIsPreviewUrlDialogOpen] = useState(false);
    const [isWriteUpDialogOpen, setIsWriteUpDialogOpen] = useState(false);
    const [isProfileDateDialogOpen, setIsProfileDateDialogOpen] = useState(false);
    const [navigationDirection, setNavigationDirection] = useState<'forward' | 'backward'>('forward');
    const [profileDate, setProfileDate] = useState(() => {
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const year = today.getFullYear();
        return `${month}/${day}/${year}`;
    });
    const setPost = useUserListSet<PostType>();

    const isValid = title.trim().length > 0 && videoUrl.trim().length > 0 && previewUrl.trim().length > 0;

    const handleOpenSubtitleDialog = () => {
        setNavigationDirection('forward');
        setIsSubtitleDialogOpen(true);
    };

    const handleCloseSubtitleDialog = () => {
        setNavigationDirection('backward');
        setIsSubtitleDialogOpen(false);
    };

    const handleOpenVideoUrlDialog = () => {
        setNavigationDirection('forward');
        setIsVideoUrlDialogOpen(true);
    };

    const handleCloseVideoUrlDialog = () => {
        setNavigationDirection('backward');
        setIsVideoUrlDialogOpen(false);
    };

    const handleOpenPreviewUrlDialog = () => {
        setNavigationDirection('forward');
        setIsPreviewUrlDialogOpen(true);
    };

    const handleClosePreviewUrlDialog = () => {
        setNavigationDirection('backward');
        setIsPreviewUrlDialogOpen(false);
    };

    const handleOpenWriteUpDialog = () => {
        setNavigationDirection('forward');
        setIsWriteUpDialogOpen(true);
    };

    const handleCloseWriteUpDialog = () => {
        setNavigationDirection('backward');
        setIsWriteUpDialogOpen(false);
    };

    const handleOpenProfileDateDialog = () => {
        setNavigationDirection('forward');
        setIsProfileDateDialogOpen(true);
    };

    const handleCloseProfileDateDialog = () => {
        setNavigationDirection('backward');
        setIsProfileDateDialogOpen(false);
    };

    const getSubtitleInputHeight = () => {
        const lines = subtitle.split('\n').length;
        const baseHeight = 40;
        const lineHeight = 20;
        const maxHeight = 80;
        return Math.min(baseHeight + (lines - 1) * lineHeight, maxHeight);
    };

    const post: VideoPost = {
        postTemplate: 'Video',
        TemplateData: {
            Title: title || 'Untitled Project',
            Subtitle: subtitle || undefined,
            VideoUrl: videoUrl || 'https://example.com',
            PreviewUrl: previewUrl || 'https://placehold.co/1200x800.png',
            ThumbnailUrl: thumbnailUrl || 'https://placehold.co/600x400.png',
            profileDate: profileDate,
        },
        writeUpData: writeUpData || undefined,
    };

    const resetForm = () => {
        setSubtitle('');
        setVideoUrl('');
        setPreviewUrl('');
        setThumbnailUrl('');
        setWriteUpData('');
        setProfileDate(() => {
            const today = new Date();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            const year = today.getFullYear();
            return `${month}/${day}/${year}`;
        });
    };

    const submitPost = (postValue: VideoPost) => {
        const postId = Math.floor(Math.random() * 1000000000).toString();

        setPost({
            key: 'posts',
            itemId: postId,
            value: postValue,
            privacy: 'PUBLIC',
            searchKeys: ['title', 'subtitle', 'videoUrl', 'previewUrl', 'writeUpData', 'profileDate'],
        });

        resetForm();
        if (onBackToFeed) {
            onBackToFeed();
        }
    };

    const handleAddPost = () => {
        if (!isValid) return;

        submitPost({
            postTemplate: 'Video',
            TemplateData: {
                Title: title,
                Subtitle: subtitle || undefined,
                VideoUrl: videoUrl,
                PreviewUrl: previewUrl,
                ThumbnailUrl: thumbnailUrl || undefined,
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
                        <ScrollView>
                            <Column className='mt-6 gap-4 pb-10'>
                                <PoppinsText className='text-primary-text text-xl font-bold'>{title}</PoppinsText>
                                <TouchableOpacity
                                    onPress={handleOpenSubtitleDialog}
                                    className='p-4 border border-subtle-border rounded-lg bg-inner-background'
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                                >
                                    <PoppinsText className='text-muted-text'>
                                        {subtitle.trim() ? subtitle : 'Subtitle'}
                                    </PoppinsText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleOpenVideoUrlDialog}
                                    className='p-4 border border-subtle-border rounded-lg bg-inner-background'
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                                >
                                    <PoppinsText className='text-muted-text'>
                                        {videoUrl.trim() ? videoUrl : 'Video URL'}
                                    </PoppinsText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleOpenPreviewUrlDialog}
                                    className='p-4 border border-subtle-border rounded-lg bg-inner-background'
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                                >
                                    <PoppinsText className='text-muted-text'>
                                        {previewUrl.trim() ? previewUrl : 'Preview image URL'}
                                    </PoppinsText>
                                </TouchableOpacity>
                                <MultiImageUpload
                                    imageUrls={thumbnailUrl ? [thumbnailUrl] : []}
                                    setImageUrls={(urls) => setThumbnailUrl(urls[0] ?? '')}
                                    buttonLabel='Add Thumbnail Image'
                                    emptyLabel='Start by adding your thumbnail image!'
                                    maxImages={1}
                                />
                                <TouchableOpacity
                                    onPress={handleOpenProfileDateDialog}
                                    className='p-4 border border-subtle-border rounded-lg bg-inner-background'
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                                >
                                    <PoppinsText className='text-muted-text'>
                                        {profileDate.trim() ? profileDate : 'Project Date'}
                                    </PoppinsText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleOpenWriteUpDialog}
                                    className='p-4 border border-subtle-border rounded-lg bg-inner-background'
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                                >
                                    <PoppinsText className='text-muted-text'>
                                        {writeUpData.trim() ? writeUpData.substring(0, 100) + (writeUpData.length > 100 ? '...' : '') : 'Tap to add write up content'}
                                    </PoppinsText>
                                </TouchableOpacity>
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

            <TextFieldDialog
                isOpen={isSubtitleDialogOpen}
                onOpenChange={handleCloseSubtitleDialog}
                value={subtitle}
                onChangeText={setSubtitle}
                placeholder='Subtitle'
                inputHeight={getSubtitleInputHeight()}
            />

            <TextFieldDialog
                isOpen={isVideoUrlDialogOpen}
                onOpenChange={handleCloseVideoUrlDialog}
                value={videoUrl}
                onChangeText={setVideoUrl}
                placeholder='Video URL'
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='url'
            />

            <TextFieldDialog
                isOpen={isPreviewUrlDialogOpen}
                onOpenChange={handleClosePreviewUrlDialog}
                value={previewUrl}
                onChangeText={setPreviewUrl}
                placeholder='Preview image URL'
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='url'
            />

            <DateFieldDialog
                isOpen={isProfileDateDialogOpen}
                onOpenChange={handleCloseProfileDateDialog}
                value={profileDate}
                onChangeText={setProfileDate}
                placeholder='Project Date'
            />

            <WriteUpDialog
                isOpen={isWriteUpDialogOpen}
                onOpenChange={handleCloseWriteUpDialog}
                value={writeUpData}
                onChangeText={setWriteUpData}
                placeholder='Write up content for your video post'
            />
        </>
    );
};

export default WithTemplateVIDEO;
