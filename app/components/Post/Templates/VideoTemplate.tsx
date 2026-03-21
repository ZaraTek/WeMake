import React from "react";
import { Text, View } from "react-native";
import type { PostType } from "../postTypes";

type VideoTemplateProps = {
  post: PostType;
};

const VideoTemplate = ({ post }: VideoTemplateProps) => {
  return (
    <View>
      <Text>{post.TemplateData.Title}</Text>
      <Text>{post.TemplateData.Subtitle}</Text>
      <Text>Video URL: {post.TemplateData.ImageUrl}</Text>
      <Text>{post.writeUpData}</Text>
    </View>
  );
};

export default VideoTemplate;
