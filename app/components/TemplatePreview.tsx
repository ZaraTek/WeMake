import React from 'react';
import { View } from 'react-native';
import Template from './Post/Templates/Template';
import type { AudioPost, ImagePost, TextPost, VideoPost } from '../../types/postTypes';

interface TemplatePreviewProps {
    templateType: 'Image' | 'Text' | 'Video' | 'Audio';
    imageTemplateVersion?: 'collage' | 'slideshow';
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ templateType, imageTemplateVersion }) => {
    const imagePost: ImagePost = {
        postTemplate: 'Image',
        TemplateData: {
            ImageUrl: ['https://placehold.co/600x400.png'],
            Title: 'Sample Project Title',
            Subtitle: 'Sample subtitle text here',
        },
        writeUpData: 'This is a sample write-up for the project...',
        imageTemplateVersion: imageTemplateVersion || 'collage',
    };

    const textPost: TextPost = {
        postTemplate: 'Text',
        TemplateData: {
            Title: 'Sample Project Title',
            Subtitle: 'Sample subtitle text here',
            Highlight: 'A strong, simple highlight lives here.',
        },
        writeUpData: 'This is a sample write-up for the project...',
    };

    const videoPost: VideoPost = {
        postTemplate: 'Video',
        TemplateData: {
            Title: 'Sample Project Title',
            Subtitle: 'Sample subtitle text here',
            VideoUrl: 'https://example.com/video',
            PreviewUrl: 'https://placehold.co/1200x800.png',
            ThumbnailUrl: 'https://placehold.co/600x400.png',
        },
        writeUpData: 'This is a sample write-up for the project...',
    };

    const audioPost: AudioPost = {
        postTemplate: 'Audio',
        TemplateData: {
            Title: 'Sample Project Title',
            Subtitle: 'Sample subtitle text here',
            AudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            CoverImageUrl: 'https://placehold.co/400x400.png',
        },
        writeUpData: 'This is a sample write-up for the project...',
    };

    const fakePost = templateType === 'Image'
        ? imagePost
        : templateType === 'Text'
            ? textPost
            : templateType === 'Video'
                ? videoPost
                : audioPost;

    return (
        <View className='h-[420px] w-[420px] scale-50 items-center justify-center'>
            <Template post={fakePost} />
        </View>
    );
};

export default TemplatePreview;
