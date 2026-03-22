
import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserListSet } from '../../hooks/useUserListSet';
import type { ImagePost, PostType } from '../../types/postTypes';
import Template from './Post/Templates/Template';
import PoppinsTextInput from './ui/forms/PoppinsTextInput';
import PublicImageUpload from './ui/imageUpload/PublicImageUpload';
import AppButton from './ui/buttons/AppButton';
import StatusButton from './ui/StatusButton';
import PoppinsText from './ui/text/PoppinsText';
import Column from './layout/Column';
import Row from './layout/Row';

interface WithTemplateIMAGEProps {
    title: string;
}

const WithTemplateIMAGE: React.FC<WithTemplateIMAGEProps> = ({
    title,
}) => {
    const [subtitle, setSubtitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [writeUpData, setWriteUpData] = useState('');
    const [imageTemplateVersion, setImageTemplateVersion] = useState<'collage' | 'slideshow'>('collage');
    const [dynamicHeight, setDynamicHeight] = useState(384); // h-96 = 24 * 16 = 384px
    const columnRef = useRef<View>(null);
    const setPost = useUserListSet<PostType>();

    useEffect(() => {
        const calculateDynamicHeight = () => {
            columnRef.current?.measure((x, y, width, height, pageX, pageY) => {
                const screenHeight = Dimensions.get('window').height;
                const calculatedHeight = screenHeight - pageY - 10; // Subtract 10px from bottom
                setDynamicHeight(Math.max(calculatedHeight, 100)); // Minimum height of 100px
            });
        };

        // Initial calculation
        calculateDynamicHeight();

        // Recalculate on orientation change
        const subscription = Dimensions.addEventListener('change', calculateDynamicHeight);
        
        return () => subscription?.remove();
    }, []);

    const isValid = title.trim().length > 0 && imageUrl.trim().length > 0;

    const post: ImagePost = {
        postTemplate: 'Image',
        TemplateData: {
            ImageUrl: [imageUrl || 'https://placehold.co/600x400.png'],
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
                    ImageUrl: [imageUrl],
                    Title: title,
                    Subtitle: subtitle || undefined,
                },
                writeUpData: writeUpData || undefined,
                imageTemplateVersion: imageTemplateVersion,
            },
            privacy: 'PUBLIC',
            searchKeys: ['title', 'subtitle', 'imageUrl', 'writeUpData'],
        });

        setSubtitle('');
        setImageUrl('');
        setWriteUpData('');
    };
    return (
        <View className='p-4 h-screen overflow-clip'>
            <View className='border-b border-subtle-border pb-4'>
                <Template post={post} />
            </View>
            <Column ref={columnRef} className='' style={{ height: dynamicHeight }}>
                <ScrollShadow LinearGradientComponent={LinearGradient}>
                    <ScrollView>
                        <Column className='mt-6 gap-4 pb-10'>
                            <PoppinsText className='text-primary-text text-xl font-bold'>{title}</PoppinsText>
                            <PoppinsTextInput
                                value={subtitle}
                                onChangeText={setSubtitle}
                                placeholder='Subtitle'
                            />
                            <Column className='gap-2'>
                                <PoppinsText className='text-primary-text text-base font-medium'>Template Version</PoppinsText>
                                <Row className='gap-2'>
                                    <TouchableOpacity
                                        onPress={() => setImageTemplateVersion('collage')}
                                        className={`flex-1 p-3 rounded-lg border ${imageTemplateVersion === 'collage' ? 'border-primary bg-primary/20' : 'border-subtle-border bg-inner-background'}`}
                                    >
                                        <PoppinsText className={`text-center ${imageTemplateVersion === 'collage' ? 'text-primary' : 'text-muted-text'}`}>Collage</PoppinsText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setImageTemplateVersion('slideshow')}
                                        className={`flex-1 p-3 rounded-lg border ${imageTemplateVersion === 'slideshow' ? 'border-primary bg-primary/20' : 'border-subtle-border bg-inner-background'}`}
                                    >
                                        <PoppinsText className={`text-center ${imageTemplateVersion === 'slideshow' ? 'text-primary' : 'text-muted-text'}`}>Slideshow</PoppinsText>
                                    </TouchableOpacity>
                                </Row>
                            </Column>
                            <PublicImageUpload
                                url={imageUrl}
                                setUrl={setImageUrl}
                                buttonLabel='Upload image'
                                emptyLabel='No image uploaded yet.'
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
            </Column>
        </View>
    );
};

export default WithTemplateIMAGE;
