import { IconGear, IconLeftArrow } from "@/assets/icons";
import tw from "@/lib/tw";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Header = () => {
  return (
    <View
      style={[
        tw`flex-row items-center bg-white py-4`,
        {
          shadowColor: "#D3D3D3",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 3,
        },
      ]}
    >
      <View style={tw`flex-row items-center gap-2 flex-1`}>
        <TouchableOpacity style={tw`px-2`}>
          <SvgXml xml={IconLeftArrow} />
        </TouchableOpacity>

        <Text style={tw`text-green text-[20px] font-poppins-semibold`}>
          CONTENTOUR BONAIRE
        </Text>
      </View>
      <TouchableOpacity style={tw`px-2`}>
        <SvgXml xml={IconGear} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
