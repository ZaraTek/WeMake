import React from "react";
import { Text, View } from "react-native";
import type { TextPost } from "../../../../types/postTypes";

type TextTemplateProps = {
  post: TextPost;
};

const TextTemplate = ({ post }: TextTemplateProps) => {
  return (
    <View>
      <Text>{post.TemplateData.Title}</Text>
      <Text>{post.TemplateData.Subtitle ?? ""}</Text>
      <Text>{post.TemplateData.Body}</Text>
      <Text>{post.writeUpData}</Text>
    </View>
  );
};

export default TextTemplate;
