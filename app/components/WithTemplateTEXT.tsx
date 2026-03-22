import React, { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserListSet } from '../../hooks/useUserListSet';
import type { PostType, TextPost } from '../../types/postTypes';
import Template from './Post/Templates/Template';
import PoppinsTextInput from './ui/forms/PoppinsTextInput';
import AppButton from './ui/buttons/AppButton';
import StatusButton from './ui/StatusButton';
import PoppinsText from './ui/text/PoppinsText';
import Column from './layout/Column';

interface WithTemplateTEXTProps {
    title: string;
}

const WithTemplateTEXT: React.FC<WithTemplateTEXTProps> = ({ title }) => {
    const [subtitle, setSubtitle] = useState('');
    const [highlight, setHighlight] = useState('');
    const [writeUpData, setWriteUpData] = useState('');
    const setPost = useUserListSet<PostType>();

    const isValid = title.trim().length > 0 && highlight.trim().length > 0;

    const post: TextPost = {
        postTemplate: 'Text',
        TemplateData: {
            Title: title || 'Untitled Project',
            Subtitle: subtitle || undefined,
            Highlight: highlight || 'Add a highlight to preview this template.',
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
                postTemplate: 'Text',
                TemplateData: {
                    Title: title,
                    Subtitle: subtitle || undefined,
                    Highlight: highlight,
                },
                writeUpData: writeUpData || undefined,
            },
            privacy: 'PUBLIC',
            searchKeys: ['title', 'subtitle', 'highlight', 'writeUpData'],
        });

        setSubtitle('');
        setHighlight('');
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
                            value={highlight}
                            onChangeText={setHighlight}
                            placeholder='Highlight'
                            multiline
                            numberOfLines={4}
                            className='h-28'
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

export default WithTemplateTEXT;
