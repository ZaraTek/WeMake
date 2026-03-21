import React from 'react';
import { View, Text } from 'react-native';
import { useUserListGet } from '../../hooks/useUserListGet';
import PoppinsText from './ui/text/PoppinsText';
import FakeConvexWrapper from './Post/FakeConvexWrapper';
import { PostType } from 'types/postTypes';
import Template from './Post/Templates/Template';

const Feed = () => {
    const posts = useUserListGet<PostType>({
        key: "posts",
        // userIds: [], // Get all posts for now
    });
    
    return (
        <View className='bg-l'>
            <PoppinsText weight='medium' color='white'>Feed</PoppinsText>
            {posts?.map((post: any, index: number) => {
                const text = post?.value?.text ?? 'NO TEXT';
                const postId = post?.id ?? '?';
                const userId = post?.userToken ?? '??';
                return (
                    <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <PoppinsText style={{ fontSize: 12, color: '#666' }} weight='medium' color='white'>
                            User: {userId}
                        </PoppinsText>
                        <PoppinsText style={{ marginTop: 5 }} weight='medium' color='white'>
                            {text}
                        </PoppinsText>
                        <PoppinsText style={{ marginTop: 5 }} weight='medium' color='white'>
                            {`post id: ${postId}`}
                        </PoppinsText>

                        {/* <FakeConvexWrapper /> */}
                        <Template post={post.value} />
                    </View>
                );
            })}
        </View>
    );
};

export default Feed;
