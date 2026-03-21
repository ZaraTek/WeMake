import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useUserListSet } from '../../hooks/useUserListSet';
import PoppinsTextInput from './ui/forms/PoppinsTextInput';
import AppButton from './ui/buttons/AppButton';

interface Post {
    text: string;
}


const NewPost = () => {
    const [postText, setPostText] = useState('');

    const setPost = useUserListSet<Post>();


    const handleAddPost = () => {
        if (!postText.trim()) return;

        const postId = Math.floor(Math.random() * 1000000000).toString();

        setPost({
            key: 'posts',
            itemId: postId,
            value: {
                text: postText,
            },
            privacy: 'PUBLIC',
            searchKeys: ["text"],
        });

        setPostText('');
    };






    return (
        <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#ccc' }}>
            <Text>New Post</Text>

            <PoppinsTextInput
                value={postText}
                onChangeText={setPostText}
                placeholder='What is on your mind?'
            />

            <AppButton onPress={handleAddPost}>
                <Text style={{ color: 'white' }}>Post</Text>
            </AppButton>
        </View>
    );
};

export default NewPost;
