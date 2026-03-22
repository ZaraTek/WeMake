import React from 'react';
import { View, Text } from 'react-native';
import { useUserListGet } from '../../hooks/useUserListGet';
import PoppinsText from './ui/text/PoppinsText';
import FakeConvexWrapper from './Post/FakeImageCollageWrapper';
import { PostType } from 'types/postTypes';
import Template from './Post/Templates/Template';
import Row from './layout/Row';
import Column from './layout/Column';


const Feed = () => {
    const posts = useUserListGet<PostType>({
        key: "posts",
        // userIds: [], // Get all posts for now
    });

    return (
        <View className='overflow-scroll h-full'>
            <PoppinsText weight='medium' color='white'>Feed</PoppinsText>
            <Column>
                {posts?.map((post: any, index: number) => {
                    const text = post?.value?.text ?? 'NO TEXT';
                    const postId = post?.id ?? '?';
                    const userId = post?.userToken ?? '??';
                    return (
                        <Column key={index}>
                            {/* <PoppinsText style={{ fontSize: 12, color: '#666' }} weight='medium' color='white'>
                            User: {userId}
                        </PoppinsText>
                        <PoppinsText style={{ marginTop: 5 }} weight='medium' color='white'>
                            {text}
                        </PoppinsText>
                        <PoppinsText style={{ marginTop: 5 }} weight='medium' color='white'>
                            {`post id: ${postId}`}
                        </PoppinsText> */}

                            {/* <FakeConvexWrapper /> */}
                            <Template post={post.value} />

                        </Column>
                    );
                })}
            </Column>
        </View>
    );
};

export default Feed;
