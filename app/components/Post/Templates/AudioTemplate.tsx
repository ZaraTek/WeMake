import React from "react";
import { Text, View } from "react-native";
import type { PostType } from "../postTypes";

type AudioTemplateProps = {
  post: PostType;
};

const AudioTemplate = ({ post }: AudioTemplateProps) => {
  return (
    <View>
      <Text>{post.TemplateData.Title}</Text>
      <Text>{post.TemplateData.Subtitle}</Text>
      <Text>Audio URL: {post.TemplateData.ImageUrl}</Text>
      <Text>{post.writeUpData}</Text>
    </View>
  );
};

export default AudioTemplate;
