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

  const backgroundUrl =
    (
      post.TemplateData as {
        backgroundUrl?: string;
        BackgroundUrl?: string;
      }
    ).backgroundUrl ??
    (
      post.TemplateData as {
        backgroundUrl?: string;
        BackgroundUrl?: string;
      }
    ).BackgroundUrl;

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
    <View className="relative w-full overflow-hidden rounded-2xl border border-subtle-border bg-inner-background p-4">
      {backgroundUrl ? (
        <>
          <Image
            source={{ uri: backgroundUrl }}
            resizeMode="cover"
            blurRadius={10}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          />
        </>
      ) : null}

      <View className="relative z-10">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-2xl font-bold text-primary-accent">
              {post.TemplateData.Title}
            </Text>

            {post.TemplateData.Subtitle && (
              <Text className="mt-1 text-base text-muted-text">
                {post.TemplateData.Subtitle}
              </Text>
            )}
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
    </View>
  );
};

export default TextTemplate;
