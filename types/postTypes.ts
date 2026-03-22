export type ImageTemplateData = {
  ImageUrl: string[];
  Title: string;
  Subtitle?: string;
  backgroundUrl?: string;
};

export type AudioTemplateData = {
  AudioUrl: string;
  CoverImageUrl?: string;
  Title: string;
  Subtitle?: string;
};

export type TextTemplateData = {
  Title: string;
  Subtitle?: string;
  Highlight: string;
  backgroundUrl?: string;
};

export type VideoTemplateData = {
  VideoUrl: string;
  ThumbnailUrl?: string;
  Title: string;
  Subtitle?: string;
  PreviewUrl: string;
};

export type ImagePost = {
  postTemplate: "Image";
  TemplateData: ImageTemplateData;
  writeUpData?: string;
  imageTemplateVersion: "collage" | "slideshow";
};

export type AudioPost = {
  postTemplate: "Audio";
  TemplateData: AudioTemplateData;
  writeUpData?: string;
};

export type TextPost = {
  postTemplate: "Text";
  TemplateData: TextTemplateData;
  writeUpData?: string;
};

export type VideoPost = {
  postTemplate: "Video";
  TemplateData: VideoTemplateData;
  writeUpData?: string;
};


export type PostType = ImagePost | AudioPost | TextPost | VideoPost;