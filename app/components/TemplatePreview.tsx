import React from 'react';
import { View } from 'react-native';
import Template from './Post/Templates/Template';
import type { AudioPost, ImagePost, TextPost, VideoPost } from '../../types/postTypes';

interface TemplatePreviewProps {
    templateType: 'Image' | 'Text' | 'Video' | 'Audio';
    imageTemplateVersion?: 'collage' | 'slideshow';
}


const previewImageUrls = [
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTdmMUrNz9jSxVacWJBFQkbqG301MUedRKsLip',
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTpbMKrFmoLbMeF2AEgnOhXvKWGfxrPakt1R8T',
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOT3l7WoAq62C395Upl1isQzyATmvGBwgJHWjXM',
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTikjQsg6J8HQEf4LFviMTcOhZzu7byIC1lGr9',
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTidkLbbyg6J8HQEf4LFviMTcOhZzu7byIC1lG',
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTOrLZzNFjfN7iCId1ThYPQr2FL5MXzApe8oRm',
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTGBrdEowuXsUgBd3nRZzhH6NG28iT79YaPyxk',
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTGBrdEowuXsUgBd3nRZzhH6NG28iT79YaPyxk',
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTXQlaamd5jwomN0g9IBFaAf4PiuqHzDChK5W8',
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTNSodBgv9lbvEhIHyXRi0Ku14aZwJVo6Asjfr',
];

const previewImagesUrls = [
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTdmMUrNz9jSxVacWJBFQkbqG301MUedRKsLip',
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTpbMKrFmoLbMeF2AEgnOhXvKWGfxrPakt1R8T',
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOT3l7WoAq62C395Upl1isQzyATmvGBwgJHWjXM',
    'https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTikjQsg6J8HQEf4LFviMTcOhZzu7byIC1lGr9',
    
];

const previewProfileDate = 'Mar 2026';

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ templateType, imageTemplateVersion }) => {
    const imagePost: ImagePost = {
        postTemplate: 'Image',
        TemplateData: {
            ImageUrl: previewImagesUrls,
            Title: 'Sample Project Title',
            Subtitle: 'Sample subtitle text here',
            profileDate: previewProfileDate,
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
            profileDate: previewProfileDate,
        },
        writeUpData: 'This is a sample write-up for the project...',
    };

    const videoPost: VideoPost = {
        postTemplate: 'Video',
        TemplateData: {
            Title: 'Sample Project Title',
            Subtitle: 'Sample subtitle text here',
            VideoUrl: 'https://example.com/video',
            PreviewUrl: previewImageUrls[0],
            ThumbnailUrl: previewImageUrls[1],
            profileDate: previewProfileDate,
        },
        writeUpData: 'This is a sample write-up for the project...',
    };

    const audioPost: AudioPost = {
        postTemplate: 'Audio',
        TemplateData: {
            Title: 'Sample Project Title',
            Subtitle: 'Sample subtitle text here',
            AudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            CoverImageUrl: previewImageUrls[2],
            profileDate: previewProfileDate,
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
