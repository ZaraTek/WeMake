import React, { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserListSet } from '../../hooks/useUserListSet';
import type { AudioPost, PostType } from '../../types/postTypes';
import Template from './Post/Templates/Template';
import PoppinsTextInput from './ui/forms/PoppinsTextInput';
import AppButton from './ui/buttons/AppButton';
import StatusButton from './ui/StatusButton';
import PoppinsText from './ui/text/PoppinsText';
import Column from './layout/Column';
import AnimatedWrapper from './ui/AnimatedWrapper';

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
    const setPost = useUserListSet<PostType>();

    const isValid = title.trim().length > 0 && audioUrl.trim().length > 0;

    const post: AudioPost = {
        postTemplate: 'Audio',
        TemplateData: {
            Title: title || 'Untitled Project',
            Subtitle: subtitle || undefined,
            AudioUrl: audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            CoverImageUrl: coverImageUrl || undefined,
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
                postTemplate: 'Audio',
                TemplateData: {
                    Title: title,
                    Subtitle: subtitle || undefined,
                    AudioUrl: audioUrl,
                    CoverImageUrl: coverImageUrl || undefined,
                },
                writeUpData: writeUpData || undefined,
            },
            privacy: 'PUBLIC',
            searchKeys: ['title', 'subtitle', 'audioUrl', 'writeUpData'],
        });

        setSubtitle('');
        setAudioUrl('');
        setCoverImageUrl('');
        setWriteUpData('');
        
        // Navigate back to Feed
        if (onBackToFeed) {
            onBackToFeed();
        }
    };

    return (
        <AnimatedWrapper direction={navigationDirection}>
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
                                value={audioUrl}
                                onChangeText={setAudioUrl}
                                placeholder='Audio URL'
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                            <PoppinsTextInput
                                value={coverImageUrl}
                                onChangeText={setCoverImageUrl}
                                placeholder='Cover image URL'
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
        </AnimatedWrapper>
    );
};

export default WithTemplateAUDIO;
