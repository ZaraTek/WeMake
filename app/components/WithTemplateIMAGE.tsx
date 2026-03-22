import React, { useState } from 'react';
import { View } from 'react-native';
import { useUserListSet } from '../../hooks/useUserListSet';
import type { ImagePost, PostType } from '../../types/postTypes';
import Template from './Post/Templates/Template';
import ImageUploadScreen from './WithTemplateIMAGE/ImageUploadScreen';
import DetailsScreen from './WithTemplateIMAGE/DetailsScreen';
import AppButton from './ui/buttons/AppButton';
import PoppinsText from './ui/text/PoppinsText';
import Column from './layout/Column';
import AnimatedWrapper from './ui/AnimatedWrapper';

interface WithTemplateIMAGEProps {
    title: string;
    onBackToFeed?: () => void;
    initialImageTemplateVersion?: 'collage' | 'slideshow';
}

const WithTemplateIMAGE: React.FC<WithTemplateIMAGEProps> = ({
    title,
    onBackToFeed,
    initialImageTemplateVersion = 'collage',
}) => {
    const [subtitle, setSubtitle] = useState('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [writeUpData, setWriteUpData] = useState('');
    const [imageTemplateVersion, setImageTemplateVersion] = useState<'collage' | 'slideshow'>(initialImageTemplateVersion);
    const [currentScreen, setCurrentScreen] = useState<'upload' | 'details'>('upload');
    const [navigationDirection, setNavigationDirection] = useState<'forward' | 'backward'>('forward');
    const [profileDate, setProfileDate] = useState(() => {
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const year = today.getFullYear();
        return `${month}/${day}/${year}`;
    });
    const setPost = useUserListSet<PostType>();

    const isValid = title.trim().length > 0 && imageUrls.length > 0;

    const post: ImagePost = {
        postTemplate: 'Image',
        TemplateData: {
            ImageUrl: imageUrls.length > 0 ? imageUrls : ['https://placehold.co/600x400.png'],
            Title: title || 'Untitled Project',
            Subtitle: subtitle || undefined,
            profileDate: profileDate,
        },
        writeUpData: writeUpData || undefined,
        imageTemplateVersion: imageTemplateVersion,
    };

    const resetForm = () => {
        setSubtitle('');
        setImageUrls([]);
        setWriteUpData('');
        setProfileDate(() => {
            const today = new Date();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            const year = today.getFullYear();
            return `${month}/${day}/${year}`;
        });
        setCurrentScreen('upload');
    };

    const submitPost = (postValue: ImagePost) => {
        const postId = Math.floor(Math.random() * 1000000000).toString();

        setPost({
            key: 'posts',
            itemId: postId,
            value: postValue,
            privacy: 'PUBLIC',
            searchKeys: ['title', 'subtitle', 'imageUrls', 'writeUpData', 'profileDate'],
        });

        resetForm();
        if (onBackToFeed) {
            onBackToFeed();
        }
    };

    const handleAddPost = () => {
        if (!isValid) return;

        submitPost({
            postTemplate: 'Image',
            TemplateData: {
                ImageUrl: imageUrls,
                Title: title,
                Subtitle: subtitle || undefined,
                profileDate: profileDate,
            },
            writeUpData: writeUpData || undefined,
            imageTemplateVersion: imageTemplateVersion,
        });
    };

    const handleNextToDetails = () => {
        setNavigationDirection('forward');
        setCurrentScreen('details');
    };

    const handleBackToUpload = () => {
        setNavigationDirection('backward');
        setCurrentScreen('upload');
    };

    const handleTemplateVersionChange = (version: 'collage' | 'slideshow') => {
        setNavigationDirection(version === 'collage' ? 'backward' : 'forward');
        setImageTemplateVersion(version);
    };

    const handleBackToTemplates = () => {
        // This will be handled by the parent PickTemplate component
        setNavigationDirection('backward');
    };

    return (
        <AnimatedWrapper direction={navigationDirection}>
            <Column className='justify-between h-full '>
                <View className='border-b border-subtle-border pb-4'>
                    <Template post={post} />
                </View>

                <View>
                    {currentScreen === 'upload' ? (
                        <ImageUploadScreen
                            title={title}
                            imageUrls={imageUrls}
                            setImageUrls={setImageUrls}
                            onNext={handleNextToDetails}
                            onBack={handleBackToTemplates}
                            imageTemplateVersion={imageTemplateVersion}
                        />
                    ) : (
                        <DetailsScreen
                            title={title}
                            subtitle={subtitle}
                            setSubtitle={setSubtitle}
                            writeUpData={writeUpData}
                            setWriteUpData={setWriteUpData}
                            profileDate={profileDate}
                            setProfileDate={setProfileDate}
                            imageTemplateVersion={imageTemplateVersion}
                            onTemplateVersionChange={handleTemplateVersionChange}
                            onCreatePost={handleAddPost}
                            onBack={handleBackToUpload}
                            isValid={isValid}
                        />
                    )}
                </View>
            </Column>
        </AnimatedWrapper>
    );
};

export default WithTemplateIMAGE;
