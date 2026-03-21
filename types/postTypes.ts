export type ImageTemplateData = {
  ImageUrl: string[];
  Title: string;
  Subtitle: string;
};

export type AudioTemplateData = {
  AudioUrl: string;
  CoverImageUrl?: string;
  Title: string;
  Subtitle: string;
};

export type TextTemplateData = {
  Title: string;
  Subtitle?: string;
  Highlight: string;
};

export type VideoTemplateData = {
  VideoUrl: string;
  ThumbnailUrl?: string;
  Title: string;
  Subtitle: string;
  PreviewUrl: string;
};

export type ImagePost = {
  postTemplate: "Image";
  TemplateData: ImageTemplateData;
};

export type AudioPost = {
  postTemplate: "Audio";
  TemplateData: AudioTemplateData;
};

export type TextPost = {
  postTemplate: "Text";
  TemplateData: TextTemplateData;
};

export type VideoPost = {
  postTemplate: "Video";
  TemplateData: VideoTemplateData;
};

export type PostType = ImagePost | AudioPost | TextPost | VideoPost;