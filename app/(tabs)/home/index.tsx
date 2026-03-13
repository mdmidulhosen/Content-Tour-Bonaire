import { IconCar } from "@/assets/icons";
import AudioPlayer from "@/components/AudioPlayer";
import Header from "@/components/Header";
import tw from "@/lib/tw";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SvgXml } from "react-native-svg";

const Home = () => {
  const lottieRef = useRef<LottieView>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") return;
      const current = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });
    })();
  }, []);

  const handlePlayingChange = (playing: boolean) => {
    setIsPlaying(playing);
    if (playing) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.pause();
    }
  };

  return (
    <View style={tw`bg-secondary h-full pb-4`}>
      <Header />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={tw`px-[4%] `}>
          <View style={tw`items-center`}>
            <LottieView
              ref={lottieRef}
              source={require("@/assets/lottie/avatar.json")}
              autoPlay={false}
              loop
              style={tw`w-36 h-36`}
            />
            <Text style={tw`text-dark text-sm font-poppins`}>
              {isPlaying ? "Speaking..." : "Paused"}
            </Text>
          </View>

          <View
            style={[
              tw`bg-white rounded-[12px] p-4 mt-8`,
              {
                shadowColor: "#B1B1B1",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
                elevation: 4,
              },
            ]}
          >
            <AudioPlayer
              source={require("@/assets/audio/voice-1.mp3")}
              title="Spot Name"
              description="Spot description - dolor sit amet ectetur. Tellus enim adipiscing corper pretium corper in."
              onPlayingChange={handlePlayingChange}
            />
          </View>

          <View style={tw`rounded-[12px] mt-8 overflow-hidden`}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={tw`w-full h-86`}
              region={
                location
                  ? { ...location, latitudeDelta: 0.01, longitudeDelta: 0.01 }
                  : { latitude: 12.1784, longitude: -68.2385, latitudeDelta: 0.05, longitudeDelta: 0.05 }
              }
            >
              {location && (
                <Marker coordinate={location}>
                  <SvgXml xml={IconCar} width={40} height={40} />
                </Marker>
              )}
            </MapView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
