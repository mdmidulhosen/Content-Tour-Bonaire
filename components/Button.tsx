import tw from "@/lib/tw";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

const Button = ({
  title,
  containerStyle,
  textStyle,
  onPress,
  iconBefore,
  iconAfter,
}: {
  title: string;
  containerStyle?: any;
  textStyle?: any;
  onPress?: () => void;
  iconBefore?: string;
  iconAfter?: string;
}) => {
  return (
    <TouchableOpacity
      style={[
        tw`bg-primary rounded-[8px] py-4 mb-4 mt-10 flex-row items-center justify-center gap-3`,
        containerStyle,
      ]}
      onPress={onPress}
    >
      {iconBefore && <SvgXml xml={iconBefore} />}
      <Text
        style={[tw`text-green text-[20px] font-poppins-semibold`, textStyle]}
      >
        {title || "No Title Found"}
      </Text>
      {iconAfter && <SvgXml xml={iconAfter} />}
    </TouchableOpacity>
  );
};

export default Button;
