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
  const backgroundImageUrl = post.TemplateData.ImageUrl?.[0] ?? null;

  return (
    <View className="relative w-full overflow-hidden rounded-2xl border border-subtle-border bg-inner-background p-4">
      {backgroundImageUrl ? (
        <>
          <Image
            source={{ uri: backgroundImageUrl }}
            resizeMode="cover"
            blurRadius={10}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          />
        </>
      ) : null}

      <View className="relative z-10">
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
    </View>
  );
};

export default ImageTemplate;
