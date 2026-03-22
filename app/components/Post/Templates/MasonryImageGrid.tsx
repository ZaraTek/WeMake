import React, { useState } from "react";
import { Image, Pressable, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export type MasonryImageItem = {
  key: string;
  uri: string;
  displayHeight: number;
  aspectRatio: number; // width / height
};

type MasonryImageGridProps = {
  masonryColumns: MasonryImageItem[][];
  gap: number;
  onSelectImage: (uri: string) => void;
};

const MasonryImageGrid = ({ masonryColumns, gap, onSelectImage }: MasonryImageGridProps) => {
  const [loadedKeys, setLoadedKeys] = useState<Set<string>>(new Set());

  return (
    <View style={{ marginTop: 16, flexDirection: "row", gap }}>
      {masonryColumns.map((column, colIndex) => (
        <View key={`col-${colIndex}`} style={{ flex: 1, gap }}>
          {column.map((img) =>
            img.uri ? (
              <Animated.View key={img.key} entering={FadeInUp}>
                <Pressable
                  onPress={() => onSelectImage(img.uri)}
                  disabled={!loadedKeys.has(img.key)}
                >
                  <Image
                    source={{ uri: img.uri }}
                    onLoad={() =>
                      setLoadedKeys((prev) => {
                        const next = new Set(prev);
                        next.add(img.key);
                        return next;
                      })
                    }
                    style={{
                      width: "100%",
                      aspectRatio: img.aspectRatio,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: "#E5E7EB",
                      backgroundColor: "#F9FAFB",
                      opacity: loadedKeys.has(img.key) ? 1 : 0,
                    }}
                    resizeMode="contain"
                  />
                </Pressable>
              </Animated.View>
            ) : null
          )}
        </View>
      ))}
    </View>
  );
};

export default MasonryImageGrid;