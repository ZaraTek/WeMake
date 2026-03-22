import React, { useEffect, useRef, useState } from "react";
import { Text, View, Image, Animated, Easing } from "react-native";
import type { TextPost } from "../../../../types/postTypes";

type TextTemplateProps = {
  post: TextPost;
};

const pen = require("../../../../assets/pen.png");

const TYPEWRITER_SPEED_MS = 35;
const CURSOR_BLINK_MS = 500;

const TextTemplate = ({ post }: TextTemplateProps) => {
  const fullHighlight = post.TemplateData.Highlight ?? "";
  const [visibleHighlight, setVisibleHighlight] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  // Swing value: -1 to 1
  const swingAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    swingAnim.setValue(-1);

    const swingLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(swingAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(swingAnim, {
          toValue: -1,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
      {
        resetBeforeIteration: false,
      }
    );

    swingLoop.start();

    return () => {
      swingLoop.stop();
    };
  }, [swingAnim]);

  const penRotate = swingAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-10deg", "10deg"], // pendulum-like swing, not full rotation
  });

  useEffect(() => {
    setVisibleHighlight("");
    setIsCursorVisible(true);

    if (!fullHighlight) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    let index = 0;
    const typingIntervalId = setInterval(() => {
      index += 1;
      setVisibleHighlight(fullHighlight.slice(0, index));

      if (index >= fullHighlight.length) {
        clearInterval(typingIntervalId);
        setIsTyping(false);
      }
    }, TYPEWRITER_SPEED_MS);

    return () => clearInterval(typingIntervalId);
  }, [fullHighlight]);

  useEffect(() => {
    if (!fullHighlight) return;

    const cursorIntervalId = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, CURSOR_BLINK_MS);

    return () => clearInterval(cursorIntervalId);
  }, [fullHighlight]);

  return (
    <View className="w-full rounded-2xl border border-subtle-border bg-inner-background p-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-2xl font-bold text-primary-accent">
            {post.TemplateData.Title}
          </Text>

          <Text className="mt-1 text-base text-muted-text">
            {post.TemplateData.Subtitle}
          </Text>
        </View>

        <Animated.Image
          source={pen}
          className="opacity-80"
          style={{
            width: 100,
            height: 100,
            borderRadius: 12,
            transform: [{ rotate: penRotate }],
          }}
          resizeMode="contain"
        />
      </View>

      <Text className="mt-4 text-xl italic leading-8 tracking-wide text-text">
        {visibleHighlight}
        {fullHighlight ? (isCursorVisible ? "|" : " ") : ""}
      </Text>
    </View>
  );
};

export default TextTemplate;
