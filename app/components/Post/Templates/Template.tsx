import React from "react";
import { Image, Text } from "react-native";
import type { PostType } from "../../../../types/postTypes";
import AudioTemplate from "./AudioTemplate";
import ImageTemplate from "./ImageTemplate";
import VideoTemplate from "./VideoTemplate";
import TextTemplate from "./TextTemplate";

type TemplateProps = {
  post: PostType;
};

const Template = ({ post }: TemplateProps) => {
  if (post.postTemplate === "Text") {
    return <TextTemplate post={post} />;
  }

  if (post.postTemplate === "Image") {
    return <ImageTemplate post={post} />;
  }

  if (post.postTemplate === "Video") {
    return <VideoTemplate post={post} />;
  }

  if (post.postTemplate === "Audio") {
    return <AudioTemplate post={post} />;
  }

  return null;
};

export default Template;
