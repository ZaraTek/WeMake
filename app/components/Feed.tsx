import React from 'react';
import { View, Text } from 'react-native';
import { useUserListGet } from '../../hooks/useUserListGet';
import PoppinsText from './ui/text/PoppinsText';
import FakeConvexWrapper from './Post/FakeConvexWrapper';

const Feed = () => {
    const posts = useUserListGet({
        key: "posts",
        // userIds: [], // Get all posts for now
    });
    
    return (
        <View className='bg-l'>
            <PoppinsText weight='medium' color='white'>Feed</PoppinsText>
            {posts?.map((post: any, index: number) => {
                const text = post?.value?.text ?? '???';
                const postId = post?.id ?? '?';
                const userId = post?.userToken ?? '??';
                return (
                    <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text style={{ fontSize: 12, color: '#666' }}>User: {userId}</Text>
                        <Text style={{ marginTop: 5 }}>{text}</Text>
                        <Text style={{ marginTop: 5 }}>{`post id: ${postId}`}</Text>

                        <FakeConvexWrapper />
                    </View>
                );
            })}
        </View>
    );
};

export default Feed;
