import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, Modal, Pressable, Text, View, useWindowDimensions } from "react-native";
import type { ImagePost } from "../../../../types/postTypes";
import MasonryImageGrid, { type MasonryImageItem } from "./MasonryImageGrid";

type ImageTemplateProps = {
  post: ImagePost;
};

const GAP = 8;

const ImageTemplate = ({ post }: ImageTemplateProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [imageSizes, setImageSizes] = useState<Record<string, { w: number; h: number }>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageSize, setSelectedImageSize] = useState<{ w: number; h: number } | null>(null);
  const [isModalImageLoaded, setIsModalImageLoaded] = useState(false);

  const images = post.TemplateData.ImageUrl ?? [];
  const validImages = useMemo(() => images.filter((u): u is string => !!u), [images]);
  const backgroundImageUrl = validImages[0] ?? null;

  useEffect(() => {
    validImages.forEach((uri) => {
      if (imageSizes[uri]) return;

      Image.getSize(
        uri,
        (w, h) => {
          if (!w || !h) return;
          setImageSizes((prev) => (prev[uri] ? prev : { ...prev, [uri]: { w, h } }));
        },
        () => {}
      );
    });
  }, [validImages, imageSizes]);

  useEffect(() => {
    setIsModalImageLoaded(false);
  }, [selectedImage]);

  useEffect(() => {
    if (!selectedImage) {
      setSelectedImageSize(null);
      return;
    }

    if (imageSizes[selectedImage]) {
      setSelectedImageSize(imageSizes[selectedImage]);
      return;
    }

    let cancelled = false;
    Image.getSize(
      selectedImage,
      (w, h) => {
        if (!cancelled && w > 0 && h > 0) {
          const size = { w, h };
          setSelectedImageSize(size);
          setImageSizes((prev) => (prev[selectedImage] ? prev : { ...prev, [selectedImage]: size }));
        }
      },
      () => {
        if (!cancelled) setSelectedImageSize(null);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [selectedImage, imageSizes]);

  const allImageSizesReady = validImages.every((uri) => !!imageSizes[uri]);

  const numColumns = validImages.length <= 1 ? 1 : 2;
  const itemWidth =
    containerWidth > 0
      ? (containerWidth - GAP * (numColumns - 1)) / numColumns
      : 0;

  const masonryColumns = useMemo(() => {
    const cols = Array.from({ length: numColumns }, () => ({
      totalHeight: 0,
      items: [] as MasonryImageItem[],
    }));

    if (!allImageSizesReady || itemWidth <= 0) return cols.map((c) => c.items);

    validImages.forEach((uri, index) => {
      const size = imageSizes[uri];
      if (!size) return;

      const ratioHOverW = size.h / size.w;
      const aspectRatio = size.w / size.h;
      const height = Math.round(Math.max(itemWidth, 1) * ratioHOverW);

      let shortestCol = 0;
      for (let i = 1; i < cols.length; i++) {
        if (cols[i].totalHeight < cols[shortestCol].totalHeight) shortestCol = i;
      }

      const displayHeight = numColumns === 1 ? Math.round(containerWidth * ratioHOverW) : height;

      cols[shortestCol].items.push({
        key: `${uri}-${index}`,
        uri,
        displayHeight,
        aspectRatio,
      });

      cols[shortestCol].totalHeight += displayHeight + GAP;
    });

    return cols.map((c) => c.items);
  }, [validImages, imageSizes, itemWidth, containerWidth, numColumns, allImageSizesReady]);

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const maxModalWidth = screenWidth * 0.92;
  const maxModalHeight = screenHeight * 0.9;

  const modalImageSize = useMemo(() => {
    if (!selectedImageSize) return { w: maxModalWidth, h: maxModalHeight };
    const scale = Math.min(
      maxModalWidth / selectedImageSize.w,
      maxModalHeight / selectedImageSize.h,
      1
    );
    return {
      w: selectedImageSize.w * scale,
      h: selectedImageSize.h * scale,
    };
  }, [selectedImageSize, maxModalWidth, maxModalHeight]);

  return (
    <View
      className="relative w-full overflow-hidden rounded-2xl border border-subtle-border bg-inner-background p-4"
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width - 32)}
    >
      {backgroundImageUrl ? (
        <>
          <Image
            source={{ uri: backgroundImageUrl }}
            resizeMode="cover"
            blurRadius={10}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
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
        <Text className="text-2xl font-bold text-primary-accent">{post.TemplateData.Title}</Text>
        {post.TemplateData.Subtitle && (
          <Text className="mt-1 text-base text-muted-text">{post.TemplateData.Subtitle}</Text>
        )}

        {allImageSizesReady && containerWidth > 0 ? (
          <MasonryImageGrid
            masonryColumns={masonryColumns}
            gap={GAP}
            onSelectImage={setSelectedImage}
          />
        ) : (
          <View style={{ marginTop: 16, minHeight: 140, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator />
          </View>
        )}
      </View>

      <Modal
        visible={!!selectedImage}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <Pressable
          onPress={() => setSelectedImage(null)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.85)",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Pressable onPress={() => {}}>
            <Image
              source={selectedImage ? { uri: selectedImage } : undefined}
              onLoad={() => setIsModalImageLoaded(true)}
              style={{
                width: modalImageSize.w,
                height: modalImageSize.h,
                borderRadius: 16,
                opacity: isModalImageLoaded ? 1 : 0,
              }}
              resizeMode="contain"
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ImageTemplate;
