import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserListGet } from '../../hooks/useUserListGet';
import PoppinsText from './ui/text/PoppinsText';
import FakeConvexWrapper from './Post/FakeImageCollageWrapper';
import { PostType } from 'types/postTypes';
import PostWrapper from './Post/PostWrapper';
import PostTopRow from './Post/PostTopRow';
import Row from './layout/Row';
import Column from './layout/Column';

interface AnimatedPostProps {
    post: any;
    index: number;
    scrollX: any;
    screenWidth: number;
}

const AnimatedPost = ({ post, index, scrollX, screenWidth }: AnimatedPostProps) => {
    const text = post?.value?.text ?? 'NO TEXT';
    const postId = post?.id ?? '?';
    const userId = post?.userToken ?? '??';
    
    // DIAL THIS IN: Translation factors for different scroll positions
    const NEAR_TRANSLATION = 0.25; // When close to active post
    const FAR_TRANSLATION = 0.2;   // When in middle of scroll transition
    
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * screenWidth,
            (index - 0.5) * screenWidth,
            index * screenWidth,
            (index + 0.5) * screenWidth,
            (index + 1) * screenWidth
        ];

        // Scale: smaller when not in center
        const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.85, 0.75, 1, 0.75, 0.85],
            Extrapolate.CLAMP
        );

        // Opacity: darker when not in center
        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.7, 0.5, 1, 0.5, 0.7],
            Extrapolate.CLAMP
        );

        // Translate X: move far apart during scroll, then back together
        const translateX = interpolate(
            scrollX.value,
            inputRange,
            [
                -screenWidth * NEAR_TRANSLATION,  // Far left: slightly toward center
                -screenWidth * FAR_TRANSLATION,   // Mid-left: far from center
                0,                                // Center: no movement
                screenWidth * FAR_TRANSLATION,    // Mid-right: far from center
                screenWidth * NEAR_TRANSLATION    // Far right: slightly toward center
            ],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ scale }, { translateX }],
            opacity,
            zIndex: interpolate(
                scrollX.value,
                inputRange,
                [1, 1, 10, 1, 1], // Center post gets zIndex 10, others get zIndex 1
                Extrapolate.CLAMP
            )
        };
    });

    return (
        <Animated.View key={index} className='w-screen' style={animatedStyle}>
            <Column className='w-full h-full'>
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
                {post.value.postTemplate === 'Image' && !post.value.imageTemplateVersion ? (
                    <>
                        <PoppinsText>NO imageTemplateVersion</PoppinsText>
                        <PoppinsText>{JSON.stringify(post.value)}</PoppinsText>
                    </>
                ) : (
                    <>
                        <PostTopRow postId={postId} userId={userId} />
                        <PostWrapper post={post.value} postId={postId} userId={userId} />
                    </>
                )}
            </Column>
        </Animated.View>
    );
};


const Feed = () => {
    const { width: screenWidth } = Dimensions.get('window');
    const scrollX = useSharedValue(0);
    const posts = useUserListGet<PostType>({
        key: "posts",
        // userIds: [], // Get all posts for now
    });

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    return (
        // <ScrollShadow LinearGradientComponent={LinearGradient}>
            <Animated.ScrollView 
                horizontal={true}
                snapToInterval={screenWidth}
                snapToAlignment="center"
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <View className='overflow-scroll h-full'>
                    
                    <Row gap={0}>
                        {posts?.map((post: any, index: number) => (
                            <AnimatedPost 
                                key={index}
                                post={post}
                                index={index}
                                scrollX={scrollX}
                                screenWidth={screenWidth}
                            />
                        ))}
                    </Row>
                </View>
            </Animated.ScrollView>
        // </ScrollShadow>
    );
};

export default Feed;
