import React, { useState } from 'react';
import { View } from 'react-native';
import MultiImageUpload from '../ui/imageUpload/MultiImageUpload';
import AppButton from '../ui/buttons/AppButton';
import StatusButton from '../ui/StatusButton';
import PoppinsText from '../ui/text/PoppinsText';
import Column from '../layout/Column';
import AnimatedWrapper from '../ui/AnimatedWrapper';

interface ImageUploadScreenProps {
    title: string;
    imageUrls: string[];
    setImageUrls: (urls: string[]) => void;
    onNext: () => void;
    onBack: () => void;
    imageTemplateVersion: 'collage' | 'slideshow';
}

const ImageUploadScreen: React.FC<ImageUploadScreenProps> = ({
    title,
    imageUrls,
    setImageUrls,
    onNext,
    onBack,
    imageTemplateVersion,
}) => {
    const isValid = imageUrls.length > 0;
    const maxImages = imageTemplateVersion === 'collage' ? 6 : 10;

    return (
        <AnimatedWrapper>
            <Column className='p-4 gap-6'>
                {/* <Column className='gap-2'>
                    
                    <PoppinsText className='text-muted-text text-sm'>
                        {imageTemplateVersion === 'collage' 
                            ? 'Add up to 6 images for your collage'
                            : 'Add up to 10 images for your slideshow'
                        }
                    </PoppinsText>
                </Column> */}

                <Column gap={0}>
                    {/* <PoppinsText className='text-primary-text text-lg font-medium'>
                        Upload Images ({imageUrls.length}/{maxImages})
                    </PoppinsText> */}
                    
                    <MultiImageUpload
                        imageUrls={imageUrls}
                        setImageUrls={setImageUrls}
                        buttonLabel='Add Images'
                        emptyLabel='Start by adding your first image!'
                        maxImages={maxImages}
                    />
                </Column>

                <Column className='gap-4'>
                    {isValid ? (
                        <AppButton variant='primary' className='w-full' onPress={onNext}>
                            <PoppinsText weight='medium'>Next →</PoppinsText>
                        </AppButton>
                    ) : (
                        <StatusButton buttonText='Add Images to Continue →' buttonAltText='REQUIRED' className='w-full' />
                    )}
                    
                </Column>
            </Column>
        </AnimatedWrapper>
    );
};

export default ImageUploadScreen;
