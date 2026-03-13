import { IconShapePause, IconShapePlay, IconVolume } from "@/assets/icons";
import tw from "@/lib/tw";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const AudioPlayer = ({
  source,
  title,
  description,
  onPlayingChange,
}: {
  source: number;
  title: string;
  description: string;
  onPlayingChange?: (playing: boolean) => void;
}) => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const onPlayingChangeRef = useRef(onPlayingChange);
  onPlayingChangeRef.current = onPlayingChange;
  const [isPlaying, setIsPlaying] = useState(false);

  const updatePlaying = useRef((val: boolean) => {
    setIsPlaying(val);
    onPlayingChangeRef.current?.(val);
  }).current;
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const load = async () => {
      const { sound } = await Audio.Sound.createAsync(source, { volume });
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        setPosition(status.positionMillis);
        setDuration(status.durationMillis ?? 0);
        if (status.didJustFinish) updatePlaying(false);
      });
    };
    load();
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  const togglePlay = async () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
    updatePlaying(!isPlaying);
  };

  const onSeek = async (value: number) => {
    if (!soundRef.current) return;
    await soundRef.current.setPositionAsync(value);
    setPosition(value);
  };

  const onVolumeChange = async (value: number) => {
    setVolume(value);
    await soundRef.current?.setVolumeAsync(value);
  };

  return (
    <View>
      <Text style={tw`text-green text-[20px] font-poppins-medium`}>
        {title}
      </Text>
      <Text style={tw`text-green text-base font-poppins mt-3`}>
        {description}
      </Text>

      {/* Progress bar */}
      <View style={tw`mt-5`}>
        <Slider
          style={tw`w-full h-4`}
          minimumValue={0}
          maximumValue={duration || 1}
          value={position}
          onSlidingComplete={onSeek}
          minimumTrackTintColor="#FDA5BD"
          maximumTrackTintColor="#FFF4F7"
          thumbTintColor="#FDA5BD"
        />
        <View style={tw`flex-row justify-between mt-1`}>
          <Text style={tw`text-subTitle text-xs font-poppins`}>
            {formatTime(position)}
          </Text>
          <Text style={tw`text-subTitle text-xs font-poppins`}>
            {formatTime(duration)}
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View style={tw`flex-row items-center gap-4 mt-4`}>
        <TouchableOpacity
          onPress={togglePlay}
          style={tw`w-12 h-12 rounded-full bg-primary items-center justify-center`}
        >
          <SvgXml xml={isPlaying ? IconShapePause : IconShapePlay} />
        </TouchableOpacity>

        <SvgXml xml={IconVolume} />

        <Slider
          style={tw`flex-1 h-4`}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={onVolumeChange}
          minimumTrackTintColor="#FFF4F7"
          maximumTrackTintColor="#FFF4F7"
          thumbTintColor="#FDA5BD"
        />
      </View>
    </View>
  );
};

export default AudioPlayer;
