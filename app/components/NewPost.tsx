import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useUserListSet } from '../../hooks/useUserListSet';
import PoppinsTextInput from './ui/forms/PoppinsTextInput';
import AppButton from './ui/buttons/AppButton';
import type { PostType, ImagePost } from '../../types/postTypes';
import Template from './Post/Templates/Template';
import PoppinsText from './ui/text/PoppinsText';
import Column from './layout/Column';
import PublicImageUpload from './ui/imageUpload/PublicImageUpload';


const NewPost = () => {
    const [postTemplate, setPostTemplate] = useState<"Image" | "Text" | "Video" | "Audio">('Image');
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [writeUpData, setWriteUpData] = useState('');

    // Create live preview post object
    const post: ImagePost = {
        postTemplate: 'Image',
        TemplateData: {
            ImageUrl: [imageUrl],
            Title: title,
            Subtitle: subtitle,
        },
        writeUpData,
    };

    const setPost = useUserListSet<PostType>();

    const handleAddPost = () => {
        if (!title.trim() || !writeUpData.trim()) return;

        const postId = Math.floor(Math.random() * 1000000000).toString();

        setPost({
            key: 'posts',
            itemId: postId,
            value: {
                postTemplate: 'Image',
                TemplateData: {
                    ImageUrl: [imageUrl],
                    Title: title,
                    Subtitle: subtitle,
                },
                writeUpData: writeUpData,
            },
            privacy: 'PUBLIC',
            searchKeys: ["title", "subtitle", "writeUpData"],
        });

        // Reset form
        setPostTemplate('Image');
        setImageUrl('https://placehold.co/600x400');
        setTitle('Title');
        setSubtitle('Subtitle');
        setWriteUpData('I am a write up for the post');
    };






    return (
        <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#ccc' }}>
            <Column>
                <PoppinsText weight='bold' style={{ marginBottom: 15 }}>Create New Post</PoppinsText>

                <PoppinsTextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder='Title'
                    
                />

                <PoppinsTextInput
                    value={subtitle}
                    onChangeText={setSubtitle}
                    placeholder='Subtitle'
                       
                />

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
                    numberOfLines={4}
                    className='h-20'
                />

                <AppButton onPress={handleAddPost}>
                    <Text style={{ color: 'white' }}>Create Post</Text>
                </AppButton>

                <Template post={post} />
            </Column>
        </View>
    );
};

export default NewPost;
