import React from "react";
import { Text, View } from "react-native";
import type { PostType } from "../postTypes";

type TextTemplateProps = {
  post: PostType;
};

const TextTemplate = ({ post }: TextTemplateProps) => {
  return (
    <View>
      <Text>{post.TemplateData.Title}</Text>
      <Text>{post.TemplateData.Subtitle}</Text>
      <Text>{post.writeUpData}</Text>
    </View>
  );
};

export default TextTemplate;
