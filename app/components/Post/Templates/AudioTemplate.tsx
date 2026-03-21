import React from "react";
import { Image, Text, View } from "react-native";
import type { AudioPost } from "../../../../types/postTypes";

type AudioTemplateProps = {
  post: AudioPost;
};

const AudioTemplate = ({ post }: AudioTemplateProps) => {
  return (
    <View className="w-full rounded-2xl border border-subtle-border bg-inner-background p-4">
      <Text className="text-2xl font-bold text-primary-accent">
        {post.TemplateData.Title}
      </Text> 
      <Text className="mt-1 text-base text-muted-text">
        {post.TemplateData.Subtitle}
      </Text>
      <Image
        source={{ uri: post.TemplateData.CoverImageUrl ?? "https://placehold.co/600x400" }}
        className="mt-4 h-56 w-full rounded-xl border border-subtle-border"
      />
      <Text className="mt-2 text-xs text-muted-text">Audio: {post.TemplateData.AudioUrl}</Text>
      <Text className="mt-4 text-base leading-6 text-text">{post.writeUpData}</Text>
    </View>
  );
};

export default AudioTemplate;
