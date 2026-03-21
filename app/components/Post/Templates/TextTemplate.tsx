import React from "react";
import { Text, View } from "react-native";
import type { TextPost } from "../../../../types/postTypes";

type TextTemplateProps = {
  post: TextPost;
};

const TextTemplate = ({ post }: TextTemplateProps) => {
  return (
    <View className="w-full rounded-2xl border border-subtle-border bg-inner-background p-4">
      <Text className="text-2xl font-bold text-primary-accent">
        {post.TemplateData.Title}
      </Text>
      <Text className="mt-1 text-base text-muted-text">
        {post.TemplateData.Subtitle}
      </Text>
      <Text className="mt-3 text-[15px] leading-6 text-primary-text">
        {post.TemplateData.Highlight}
      </Text>
    </View>
  );
};

export default TextTemplate;
