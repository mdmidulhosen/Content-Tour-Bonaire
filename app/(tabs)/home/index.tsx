import { IconCar, IconShapeClose } from "@/assets/icons";
import AudioPlayer from "@/components/AudioPlayer";
import BlurModal from "@/components/BlurModal";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import tw from "@/lib/tw";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SvgXml } from "react-native-svg";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const { selectedLanguage, setLanguage, languages } = useLanguage();
  const lottieRef = useRef<LottieView>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState(selectedLanguage);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

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
      <Header handleLanguage={() => { setPendingLanguage(selectedLanguage); setIsLanguageModalOpen(true); }} />
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
              {isPlaying ? t("home.speaking") : t("home.paused")}
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
              title={t("home.spotName")}
              description={t("home.spotDescription")}
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
                  : {
                      latitude: 12.1784,
                      longitude: -68.2385,
                      latitudeDelta: 0.05,
                      longitudeDelta: 0.05,
                    }
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
      <BlurModal
        open={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        content={
          <View>
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`text-green text-[20px] font-poppins-semibold`}>
                {t("home.selectLanguage")}
              </Text>
              <TouchableOpacity onPress={() => setIsLanguageModalOpen(false)}>
                <SvgXml xml={IconShapeClose} />
              </TouchableOpacity>
            </View>

            <View style={tw`mt-4 gap-y-4`}>
              {languages.map((lang) => {
                const isSelected = pendingLanguage === lang;
                return (
                  <TouchableOpacity
                    key={lang}
                    onPress={() => setPendingLanguage(lang)}
                    style={tw`flex-row items-center gap-3`}
                  >
                    <View
                      style={[
                        tw`w-6 h-6 rounded-full border-2 items-center justify-center`,
                        { borderColor: isSelected ? "#FDA5BD" : "#D9D9D9" },
                      ]}
                    >
                      {isSelected && (
                        <View style={tw`w-3 h-3 rounded-full bg-primary`} />
                      )}
                    </View>
                    <Text
                      style={tw`text-base font-poppins-medium ${isSelected ? "text-primary" : "text-green"}`}
                    >
                      {lang}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Button
              title={t("home.select")}
              onPress={() => { setLanguage(pendingLanguage); setIsLanguageModalOpen(false); }}
              textStyle={tw`text-white`}
            />
          </View>
        }
      />
    </View>
  );
};

export default Home;
