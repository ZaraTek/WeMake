import React from "react";
import { Image, Text, View } from "react-native";
import type { ImagePost } from "../../../../types/postTypes";

type ImageTemplateProps = {
  post: ImagePost;
};

const ImageTemplate = ({ post }: ImageTemplateProps) => {
  return (
    <View className="w-full rounded-2xl border border-subtle-border bg-inner-background p-4">
      <Text className="text-2xl font-bold text-primary-accent">
        {post.TemplateData.Title}
      </Text> 
      <Text className="mt-1 text-base text-muted-text">
        {post.TemplateData.Subtitle}
      </Text>
      <View
        className="mt-4 w-full overflow-hidden rounded-xl border border-subtle-border"
        style={{ aspectRatio: 1 }}
      >
        <Image
          source={{ uri: post.TemplateData.ImageUrl }}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>
      <Text className="mt-4 text-base leading-6 text-text">{post.writeUpData}</Text>
    </View>
  );
};

export default ImageTemplate;
