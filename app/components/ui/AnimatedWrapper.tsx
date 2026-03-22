import React, { useEffect } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    FadeInRight,
    FadeOutLeft,
    FadeInLeft,
    FadeOutRight,
} from 'react-native-reanimated';
import { View } from 'react-native';

interface AnimatedWrapperProps {
    children: React.ReactNode;
    isVisible?: boolean;
    direction?: 'forward' | 'backward';
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ 
    children, 
    isVisible = true,
    direction = 'forward'
}) => {
    const opacity = useSharedValue(0);
    const translateX = useSharedValue(direction === 'forward' ? 50 : -50);

    useEffect(() => {
        if (isVisible) {
            opacity.value = withTiming(1, { duration: 300 });
            translateX.value = withTiming(0, { duration: 300 });
        } else {
            opacity.value = withTiming(0, { duration: 300 });
            translateX.value = withTiming(direction === 'forward' ? -50 : 50, { duration: 300 });
        }
    }, [isVisible, direction]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <Animated.View 
            style={animatedStyle}
            entering={direction === 'forward' ? FadeInRight.duration(300) : FadeInLeft.duration(300)}
            exiting={direction === 'forward' ? FadeOutLeft.duration(300) : FadeOutRight.duration(300)}
        >
            {children}
        </Animated.View>
    );
};

export default AnimatedWrapper;
