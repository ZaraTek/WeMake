import React, { useEffect, useMemo, useState } from "react";
import { Image, Modal, Pressable, Text, View, useWindowDimensions } from "react-native";
import type { ImagePost } from "../../../../types/postTypes";

type ImageTemplateProps = {
  post: ImagePost;
};

const GAP = 8;
const FALLBACK_RATIOS = [1.2, 1.45, 0.95, 1.3, 1.1]; // height / width fallback

const ImageTemplate = ({ post }: ImageTemplateProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [imageSizes, setImageSizes] = useState<Record<string, { w: number; h: number }>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageSize, setSelectedImageSize] = useState<{ w: number; h: number } | null>(null);
  const images = post.TemplateData.ImageUrl ?? [];

  useEffect(() => {
    const uniqueUris = [...new Set(images)].filter(Boolean);

    uniqueUris.forEach((uri) => {
      if (imageSizes[uri]) return;

      Image.getSize(
        uri,
        (w, h) => {
          if (!w || !h) return;
          setImageSizes((prev) => (prev[uri] ? prev : { ...prev, [uri]: { w, h } }));
        },
        () => {
          // keep fallback ratio if size fetch fails
        }
      );
    });

    return () => {
      // cleanup
    };
  }, [images, imageSizes]);

  useEffect(() => {
    if (!selectedImage) {
      setSelectedImageSize(null);
      return;
    }

    // Use cached size if already known
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

  const numColumns = images.length <= 1 ? 1 : 2;
  const itemWidth =
    containerWidth > 0
      ? (containerWidth - GAP * (numColumns - 1)) / numColumns
      : 0;

  const masonryColumns = useMemo(() => {
    const cols = Array.from({ length: numColumns }, () => ({
      totalHeight: 0,
      items: [] as {
        key: string;
        uri: string;
        displayHeight: number;
        aspectRatio: number; // width / height
      }[],
    }));

    images.forEach((uri, index) => {
      const size = imageSizes[uri];
      const ratioHOverW =
        size ? size.h / size.w : FALLBACK_RATIOS[index % FALLBACK_RATIOS.length];
      const aspectRatio =
        size ? size.w / size.h : 1 / ratioHOverW;
      const height = Math.round(Math.max(itemWidth, 1) * ratioHOverW);

      let shortestCol = 0;
      for (let i = 1; i < cols.length; i++) {
        if (cols[i].totalHeight < cols[shortestCol].totalHeight) shortestCol = i;
      }

      cols[shortestCol].items.push({
        key: `${uri}-${index}`,
        uri,
        displayHeight: numColumns === 1 ? Math.round(containerWidth * ratioHOverW) : height,
        aspectRatio,
      });
      cols[shortestCol].totalHeight += (numColumns === 1 ? Math.round(containerWidth * ratioHOverW) : height) + GAP;
    });

    return cols.map((c) => c.items);
  }, [images, imageSizes, itemWidth, containerWidth, numColumns]);

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
      className="w-full rounded-2xl border border-subtle-border bg-inner-background p-4"
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width - 32)}
    >
      <Text className="text-2xl font-bold text-primary-accent">
        {post.TemplateData.Title}
      </Text>
      <Text className="mt-1 text-base text-muted-text">
        {post.TemplateData.Subtitle}
      </Text>

      <View style={{ marginTop: 16, flexDirection: "row", gap: GAP }}>
        {masonryColumns.map((column, colIndex) => (
          <View key={`col-${colIndex}`} style={{ flex: 1, gap: GAP }}>
            {column.map((img) => (
              <Pressable key={img.key} onPress={() => setSelectedImage(img.uri)}>
                <Image
                  source={{ uri: img.uri }}
                  style={{
                    width: "100%",
                    aspectRatio: img.aspectRatio, // preserves original ratio
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    backgroundColor: "#F9FAFB",
                  }}
                  resizeMode="contain" // no crop
                />
              </Pressable>
            ))}
          </View>
        ))}
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
              style={{
                width: modalImageSize.w,
                height: modalImageSize.h,
                borderRadius: 16,
                // backgroundColor removed so no visible box
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
