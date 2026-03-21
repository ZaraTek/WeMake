import React from "react";
import { Text, View, Image, Pressable, Linking } from "react-native";
import type { VideoPost } from "../../../../types/postTypes";

type VideoTemplateProps = {
  post: VideoPost;
};

const playButton = require("../../../../assets/play-button.png");

const VideoTemplate = ({ post }: VideoTemplateProps) => {
  return (
    <View className="w-full rounded-2xl border border-subtle-border bg-inner-background p-4">
          <Text className="text-2xl font-bold text-primary-accent">
            {post.TemplateData.Title}
          </Text> 
          <Text className="mt-1 text-base text-muted-text">
            {post.TemplateData.Subtitle}
          </Text>
          

          <Pressable
            onPress={() => {
              // open the video url in the browser
              Linking.openURL(post.TemplateData.VideoUrl);
            }}
            className="relative mt-4 h-56 w-full"
          >
            <Image
              source={{ uri: post.TemplateData.ThumbnailUrl }}
              className="h-56 w-full rounded-xl border primary-accent"
            />
            <View
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}
              pointerEvents="none"
            >
              <Image
                source={playButton}
                style={{ width: 72, height: 72, opacity: 0.85 }}
              />
            </View>
          </Pressable>
          
          <Text className="mt-4 text-base leading-6 text-text">{post.writeUpData}</Text>
        </View>
  );
};

export default VideoTemplate;
