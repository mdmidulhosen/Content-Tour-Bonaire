import AudioPlayer from "@/components/AudioPlayer";
import Header from "@/components/Header";
import tw from "@/lib/tw";
import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const Home = () => {
  const lottieRef = useRef<LottieView>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
              initialRegion={{
                latitude: 12.1784,
                longitude: -68.2385,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
