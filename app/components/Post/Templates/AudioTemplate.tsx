import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Audio, type AVPlaybackStatus } from "expo-av";
import { Pause, Play } from "lucide-react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import type { AudioPost } from "../../../../types/postTypes";
import Row from "../../layout/Row";

/** Bundled artwork when no remote cover is set */
const recordPlayerAsset = require("../../../../assets/record-player.png");

type AudioTemplateProps = {
  post: AudioPost;
};

function formatMillis(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "0:00";
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function PostAudioPlayer({ uri }: { uri: string }) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [playing, setPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    setPositionMillis(status.positionMillis);
    setDurationMillis(status.durationMillis ?? 0);
    setPlaying(status.isPlaying);
    if (status.didJustFinish) {
      setPlaying(false);
      setPositionMillis(0);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        try {
          await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            allowsRecordingIOS: false,
          });
        } catch {
          // setAudioModeAsync can fail on web; playback may still work
        }

        const { sound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: false, progressUpdateIntervalMillis: 500 },
          onPlaybackStatusUpdate,
        );

        if (cancelled) {
          await sound.unloadAsync();
          return;
        }

        soundRef.current = sound;
        setLoadState("ready");
      } catch {
        if (!cancelled) setLoadState("error");
      }
    })();

    return () => {
      cancelled = true;
      const s = soundRef.current;
      soundRef.current = null;
      void s?.unloadAsync();
    };
  }, [uri, onPlaybackStatusUpdate]);

  const togglePlayback = async () => {
    const sound = soundRef.current;
    if (!sound || loadState !== "ready") return;
    const status = await sound.getStatusAsync();
    if (!status.isLoaded) return;
    if (status.isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const progress =
    durationMillis > 0 ? Math.min(1, positionMillis / durationMillis) : 0;

  return (
    <View className="mt-3 rounded-xl border border-subtle-border bg-background p-3">
      <Row className="items-center" gap={3}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={playing ? "Pause" : "Play"}
          onPress={togglePlayback}
          disabled={loadState !== "ready"}
          className="rounded-full bg-primary-accent p-3 opacity-100 disabled:opacity-40"
        >
          {playing ? (
            <Pause size={22} color="white" fill="white" />
          ) : (
            <Play size={22} color="white" fill="white" />
          )}
        </Pressable>
        <View className="min-w-0 flex-1">
          <View className="h-1.5 overflow-hidden rounded-full bg-inner-background">
            <View
              className="h-full rounded-full bg-primary-accent"
              style={{ width: `${progress * 100}%` }}
            />
          </View>
          <Row className="mt-1 justify-between" gap={2}>
            <Text className="text-xs text-muted-text">
              {formatMillis(positionMillis)}
            </Text>
            <Text className="text-xs text-muted-text">
              {formatMillis(durationMillis)}
            </Text>
          </Row>
        </View>
      </Row>
      {loadState === "loading" && (
        <Text className="mt-2 text-xs text-muted-text">Loading audio…</Text>
      )}
      {loadState === "error" && (
        <Text className="mt-2 text-xs text-destructive">
          Could not load this audio URL.
        </Text>
      )}
    </View>
  );
}

const RECORD_SIZE = 160;
/** Center “label” circle; cover art sits on top of the record */
const COVER_OVERLAY_SIZE = Math.round(RECORD_SIZE * 0.52);
const SPIN_DURATION_MS = 12_000;

const AudioTemplate = ({ post }: AudioTemplateProps) => {
  const spin = useSharedValue(0);

  useEffect(() => {
    spin.value = withRepeat(
      withTiming(360, {
        duration: SPIN_DURATION_MS,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
    return () => {
      cancelAnimation(spin);
    };
  }, [spin]);

  const spinAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));

  return (
    <View className="w-full rounded-2xl border border-subtle-border bg-inner-background p-4">
      <Text className="text-2xl font-bold text-primary-accent">
        {post.TemplateData.Title}
      </Text>
      <Text className="mt-1 text-base text-muted-text">
        {post.TemplateData.Subtitle}
      </Text>
      <View className="mt-4 w-full items-center">
        <View
          style={{
            width: RECORD_SIZE,
            height: RECORD_SIZE,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={recordPlayerAsset}
            className="overflow-hidden "
            style={{
              position: "absolute",
              width: RECORD_SIZE,
              height: RECORD_SIZE,
              left: 0,
              top: 0,
            }}
            resizeMode="cover"
          />
          {post.TemplateData.CoverImageUrl ? (
            <View
              className="overflow-hidden rounded-full border-2 border-inner-background shadow-sm"
              style={{
                width: COVER_OVERLAY_SIZE,
                height: COVER_OVERLAY_SIZE,
              }}
            >
              <Image
                source={{ uri: post.TemplateData.CoverImageUrl }}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>
          ) : null}
        </View>
      </View>
      <PostAudioPlayer uri={post.TemplateData.AudioUrl} />
      <Text className="mt-4 text-base leading-6 text-text">
        {post.writeUpData}
      </Text>
    </View>
  );
};

export default AudioTemplate;
