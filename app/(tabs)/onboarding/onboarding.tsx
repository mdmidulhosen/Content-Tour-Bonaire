import { IconPlay, IconRightShape } from "@/assets/icons";
import Button from "@/components/Button";
import tw from "@/lib/tw";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Onboarding = () => {
  const router = useRouter();
  const list = ["GPS Navigation", "Auto-Play Stories", "Virtual Guide"];
  return (
    <ImageBackground
      source={require("@/assets/images/boarding-banner.jpg")}
      style={tw`h-full justify-end`}
    >
      <BlurView
        intensity={50}
        tint="dark"
        style={tw`overflow-hidden rounded-t-3xl px-[4%] pt-6`}
      >
        <Text style={tw`text-white text-[28px] font-poppins-bold mb-4`}>
          Your Experience Awaits
        </Text>
        <Text style={tw`text-subTitle text-base font-poppins-regular mb-6`}>
          Our virtual guide will automatically share fascinating stories &
          historical facts as you travel along the island.
        </Text>

        <View style={tw`gap-y-4 mb-4`}>
          {list.map((item, index) => (
            <View key={index} style={tw`flex-row items-center gap-4`}>
              <View style={tw`flex-row items-center gap-4`}>
                <SvgXml xml={IconRightShape} />
                <Text style={tw`text-subTitle text-base font-poppins-medium`}>
                  {item}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <Button
          title="Start your tour"
          iconBefore={IconPlay}
          onPress={() => router.push("/auth/login")}
        />
      </BlurView>
    </ImageBackground>
  );
};

export default Onboarding;
