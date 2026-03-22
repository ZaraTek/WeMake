/**
 * MultiImageUpload - A component for uploading and managing multiple images
 */
import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import PublicImageUpload from './PublicImageUpload';
import AppButton from '../buttons/AppButton';
import PoppinsText from '../text/PoppinsText';
import Column from '../../layout/Column';
import Row from '../../layout/Row';
import { Image } from 'react-native';

interface MultiImageUploadProps {
    imageUrls: string[];
    setImageUrls: (urls: string[]) => void;
    buttonLabel?: string;
    emptyLabel?: string;
    maxImages?: number;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
    imageUrls,
    setImageUrls,
    buttonLabel = 'Add Image',
    emptyLabel = 'No images uploaded yet.',
    maxImages = 10,
}) => {
    const [currentUploadUrl, setCurrentUploadUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = (url: string | ((prevState: string) => string)) => {
        const urlString = typeof url === 'string' ? url : url('');
        if (urlString && imageUrls.length < maxImages) {
            const newUrls = [...imageUrls, urlString];
            setImageUrls(newUrls);
            setCurrentUploadUrl('');
            setIsUploading(false);
        }
    };

    const handleRemoveImage = (index: number) => {
        const newUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newUrls);
    };

    const handleReorder = (fromIndex: number, toIndex: number) => {
        const newUrls = [...imageUrls];
        const [movedUrl] = newUrls.splice(fromIndex, 1);
        newUrls.splice(toIndex, 0, movedUrl);
        setImageUrls(newUrls);
    };

    return (
        <Column className='w-full p-4 bg-light/30'>
            <Column gap={3}>
                <PoppinsText weight='medium'>Images ({imageUrls.length}/{maxImages})</PoppinsText>

                {imageUrls.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Row className='gap-2'>
                            {imageUrls.map((url, index) => (
                                <View key={index} className='relative'>
                                    <TouchableOpacity
                                        onLongPress={() => handleRemoveImage(index)}
                                        className='w-20 h-20 overflow-hidden rounded-lg border border-subtle-border bg-background'
                                    >
                                        <Image
                                            source={{ uri: url }}
                                            className='w-full h-full'
                                            resizeMode='cover'
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleRemoveImage(index)}
                                        className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center'
                                    >
                                        <PoppinsText className='text-white text-xs'>×</PoppinsText>
                                    </TouchableOpacity>
                                    <PoppinsText className='text-xs text-center mt-1'>{index + 1}</PoppinsText>
                                </View>
                            ))}
                        </Row>
                    </ScrollView>
                )}

                {imageUrls.length < maxImages && (
                    <View className='-m-4'>
                        <PublicImageUpload
                            url={currentUploadUrl}
                            setUrl={handleImageUpload}
                            buttonLabel={buttonLabel}
                            emptyLabel={emptyLabel}
                        />
                    </View>
                )}
            </Column>
        </Column>
    );
};

export default MultiImageUpload;
