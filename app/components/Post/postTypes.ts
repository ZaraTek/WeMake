export type TemplateData = {
  ImageUrl: string[];
  Title: string;
  Subtitle: string;
};

export type PostType = {
  postTemplate: "Image" | "Text" | "Video" | "Audio";
  TemplateData: TemplateData;
  writeUpData: string;
};
