import React from "react";
import { Text, View } from "react-native";
import type { VideoPost } from "../../../../types/postTypes";

type VideoTemplateProps = {
  post: VideoPost;
};

const VideoTemplate = ({ post }: VideoTemplateProps) => {
  return (
    <View>
      <Text>{post.TemplateData.Title}</Text>
      <Text>{post.TemplateData.Subtitle}</Text>
      <Text>Video URL: {post.TemplateData.VideoUrl}</Text>
      <Text>{post.writeUpData}</Text>
    </View>
  );
};

export default VideoTemplate;
