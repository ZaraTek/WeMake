import React from "react";
import { Image, Text, View } from "react-native";
import type { PostType } from "../postTypes";

type ImageTemplateProps = {
  post: PostType;
};

const ImageTemplate = ({ post }: ImageTemplateProps) => {
  return (
    <View>
      <Text>{post.TemplateData.Title}</Text>
      <Text>{post.TemplateData.Subtitle}</Text>
      <Image source={{ uri: post.TemplateData.ImageUrl }} />
      <Text>{post.writeUpData}</Text>
    </View>
  );
};

export default ImageTemplate;
