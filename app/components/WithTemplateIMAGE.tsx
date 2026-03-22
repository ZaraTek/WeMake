
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
}

const WithTemplateIMAGE: React.FC<WithTemplateIMAGEProps> = ({
    title,
    onBackToFeed,
}) => {
    const [subtitle, setSubtitle] = useState('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [writeUpData, setWriteUpData] = useState('');
    const [imageTemplateVersion, setImageTemplateVersion] = useState<'collage' | 'slideshow'>('collage');
    const [currentScreen, setCurrentScreen] = useState<'upload' | 'details'>('upload');
    const [navigationDirection, setNavigationDirection] = useState<'forward' | 'backward'>('forward');
    const setPost = useUserListSet<PostType>();

    const isValid = title.trim().length > 0 && imageUrls.length > 0;

    const post: ImagePost = {
        postTemplate: 'Image',
        TemplateData: {
            ImageUrl: imageUrls.length > 0 ? imageUrls : ['https://placehold.co/600x400.png'],
            Title: title || 'Untitled Project',
            Subtitle: subtitle || undefined,
        },
        writeUpData: writeUpData || undefined,
        imageTemplateVersion: imageTemplateVersion,
    };

    const handleAddPost = () => {
        if (!isValid) return;

        const postId = Math.floor(Math.random() * 1000000000).toString();

        setPost({
            key: 'posts',
            itemId: postId,
            value: {
                postTemplate: 'Image',
                TemplateData: {
                    ImageUrl: imageUrls,
                    Title: title,
                    Subtitle: subtitle || undefined,
                },
                writeUpData: writeUpData || undefined,
                imageTemplateVersion: imageTemplateVersion,
            },
            privacy: 'PUBLIC',
            searchKeys: ['title', 'subtitle', 'imageUrls', 'writeUpData'],
        });

        // Reset form
        setSubtitle('');
        setImageUrls([]);
        setWriteUpData('');
        setCurrentScreen('upload');
        
        // Navigate back to Feed
        if (onBackToFeed) {
            onBackToFeed();
        }
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
                {/* Preview Header */}
                <View className='border-b border-subtle-border pb-4'>
                    <Template post={post} />
                </View>

                {/* Screen Content - takes remaining space */}
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
