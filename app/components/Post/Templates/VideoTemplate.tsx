import React from "react";
import { Text, View, Image, Pressable, Linking } from "react-native";
import type { VideoPost } from "../../../../types/postTypes";

type VideoTemplateProps = {
  post: VideoPost;
};

const playButton = require("../../../../assets/play-button.png");

const VideoTemplate = ({ post }: VideoTemplateProps) => {
  return (
    <View className="w-full rounded-2xl border border-subtle-border bg-inner-background" style={{ overflow: 'hidden' }}>
      {/* Background GIF */}
      <Image
        source={{ uri: post.TemplateData.PreviewUrl }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
        resizeMode="cover"
        blurRadius={0}
      />
      
      {/* Readability overlay */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.25)',
          zIndex: 1,
        }}
        pointerEvents="none"
      />
      {/* Foreground content */}
      <View style={{ position: 'relative', zIndex: 2, padding: 16 }}>
        <Text className="text-2xl font-bold text-primary-accent">
          {post.TemplateData.Title}
        </Text>
        <Text className="mt-1 text-base text-muted-text">
          {post.TemplateData.Subtitle}
        </Text>
        <View className="w-[50vw] h-[30vw]" style={{ marginBottom: 24 }}>
        <Pressable
          onPress={() => {
            // open the video url in the browser
            Linking.openURL(post.TemplateData.VideoUrl);
          }}
          style={{ width: '100%', height: '100%', alignSelf: 'flex-start', marginTop: 16, position: 'relative' }}
        >
          <Image
            source={{ uri: post.TemplateData.ThumbnailUrl }}
            style={{ width: '100%', height: '100%', borderRadius: 12, borderWidth: 1, borderColor: '#888' }}
          />
          <View
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}
            pointerEvents="none"
          >
            <Image
              source={playButton}
              style={{ width: 40, height: 40, opacity: 0.85 }}
            />
          </View>
        </Pressable>
        </View>
      </View>
    </View>
  );
};

export default VideoTemplate;
