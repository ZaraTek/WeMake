import React from "react";
import { Image, ScrollView, Text, View, useWindowDimensions } from "react-native";
import type { ImagePost } from "../../../../types/postTypes";

type ImageTemplateProps = {
  post: ImagePost;
};

const ImageTemplate = ({ post }: ImageTemplateProps) => {
  const { width: screenWidth } = useWindowDimensions();
  const [carouselWidth, setCarouselWidth] = React.useState(screenWidth - 32);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <View className="w-full rounded-2xl border border-subtle-border bg-inner-background p-4">
      <Text className="text-2xl font-bold text-primary-accent">
        {post.TemplateData.Title}
      </Text>
      <Text className="mt-1 text-base text-muted-text">
        {post.TemplateData.Subtitle}
      </Text>

      <View
        className="mt-4 overflow-hidden rounded-xl border border-subtle-border"
        onLayout={(e) => setCarouselWidth(e.nativeEvent.layout.width)}
      >
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          onMomentumScrollEnd={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            const index = Math.round(x / carouselWidth);
            setCurrentIndex(index);
          }}
        >
          {post.TemplateData.ImageUrl.map((url: string, index: number) => (
            <Image
              key={index}
              source={{ uri: url }}
              style={{ width: carouselWidth, height: 224 }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      </View>

      <View className="mt-3 flex-row items-center justify-center">
        {post.TemplateData.ImageUrl.map((_, index: number) => (
          <View
            key={index}
            className={`mx-1 h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-primary-accent" : "bg-subtle-border"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageTemplate;
