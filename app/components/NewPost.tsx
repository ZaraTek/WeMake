import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useUserListSet } from '../../hooks/useUserListSet';
import PoppinsTextInput from './ui/forms/PoppinsTextInput';
import AppButton from './ui/buttons/AppButton';
import type { PostType } from './Post/postTypes';
import Template from './Post/Templates/Template';
import PoppinsText from './ui/text/PoppinsText';


const NewPost = () => {
    const [postTemplate, setPostTemplate] = useState<"Image" | "Text" | "Video" | "Audio">('Image');
    const [imageUrl, setImageUrl] = useState('https://placehold.co/600x400');
    const [title, setTitle] = useState('Title');
    const [subtitle, setSubtitle] = useState('Subtitle');
    const [writeUpData, setWriteUpData] = useState('I am a write up for the post');

    // Create live preview post object
    const post: PostType = {
        postTemplate,
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
                postTemplate: postTemplate,
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
            <PoppinsText weight='bold' style={{ marginBottom: 15 }}>Create New Post</PoppinsText>

            <PoppinsTextInput
                value={title}
                onChangeText={setTitle}
                placeholder='Title'
                style={{ marginBottom: 10 }}
            />

            <PoppinsTextInput
                value={subtitle}
                onChangeText={setSubtitle}
                placeholder='Subtitle'
                style={{ marginBottom: 10 }}
            />

            <PoppinsTextInput
                value={imageUrl}
                onChangeText={setImageUrl}
                placeholder='Image URL'
                style={{ marginBottom: 10 }}
            />

            <PoppinsTextInput
                value={writeUpData}
                onChangeText={setWriteUpData}
                placeholder='Write up content'
                multiline
                numberOfLines={4}
                style={{ marginBottom: 15, height: 100 }}
            />

            <AppButton onPress={handleAddPost}>
                <Text style={{ color: 'white' }}>Create Post</Text>
            </AppButton>
            
            <Template post={post} />
        </View>
    );
};

export default NewPost;
