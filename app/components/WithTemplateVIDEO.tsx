import React, { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserListSet } from '../../hooks/useUserListSet';
import type { PostType, VideoPost } from '../../types/postTypes';
import Template from './Post/Templates/Template';
import PoppinsTextInput from './ui/forms/PoppinsTextInput';
import AppButton from './ui/buttons/AppButton';
import StatusButton from './ui/StatusButton';
import PoppinsText from './ui/text/PoppinsText';
import Column from './layout/Column';

interface WithTemplateVIDEOProps {
    title: string;
}

const WithTemplateVIDEO: React.FC<WithTemplateVIDEOProps> = ({ title }) => {
    const [subtitle, setSubtitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [writeUpData, setWriteUpData] = useState('');
    const setPost = useUserListSet<PostType>();

    const isValid = title.trim().length > 0 && videoUrl.trim().length > 0 && previewUrl.trim().length > 0;

    const post: VideoPost = {
        postTemplate: 'Video',
        TemplateData: {
            Title: title || 'Untitled Project',
            Subtitle: subtitle || undefined,
            VideoUrl: videoUrl || 'https://example.com',
            PreviewUrl: previewUrl || 'https://placehold.co/1200x800.png',
            ThumbnailUrl: thumbnailUrl || 'https://placehold.co/600x400.png',
        },
        writeUpData: writeUpData || undefined,
    };

    const handleAddPost = () => {
        if (!isValid) return;

        const postId = Math.floor(Math.random() * 1000000000).toString();

        setPost({
            key: 'posts',
            itemId: postId,
            value: {
                postTemplate: 'Video',
                TemplateData: {
                    Title: title,
                    Subtitle: subtitle || undefined,
                    VideoUrl: videoUrl,
                    PreviewUrl: previewUrl,
                    ThumbnailUrl: thumbnailUrl || undefined,
                },
                writeUpData: writeUpData || undefined,
            },
            privacy: 'PUBLIC',
            searchKeys: ['title', 'subtitle', 'videoUrl', 'previewUrl', 'writeUpData'],
        });

        setSubtitle('');
        setVideoUrl('');
        setPreviewUrl('');
        setThumbnailUrl('');
        setWriteUpData('');
    };

    return (
        <View className='p-4 h-full overflow-clip'>
            <View className='border-b border-subtle-border pb-4'>
                <Template post={post} />
            </View>
            <ScrollShadow LinearGradientComponent={LinearGradient}>
                <ScrollView>
                    <Column className='mt-6 gap-4 pb-10'>
                        <PoppinsText className='text-primary-text text-xl font-bold'>{title}</PoppinsText>
                        <PoppinsTextInput
                            value={subtitle}
                            onChangeText={setSubtitle}
                            placeholder='Subtitle'
                        />
                        <PoppinsTextInput
                            value={videoUrl}
                            onChangeText={setVideoUrl}
                            placeholder='Video URL'
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                        <PoppinsTextInput
                            value={previewUrl}
                            onChangeText={setPreviewUrl}
                            placeholder='Preview image URL'
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                        <PoppinsTextInput
                            value={thumbnailUrl}
                            onChangeText={setThumbnailUrl}
                            placeholder='Thumbnail URL'
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                        <PoppinsTextInput
                            value={writeUpData}
                            onChangeText={setWriteUpData}
                            placeholder='Write up content'
                            multiline
                            numberOfLines={5}
                            className='h-32'
                        />
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
    );
};

export default WithTemplateVIDEO;
