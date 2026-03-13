import tw from "@/lib/tw";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const InputText = ({
  containerStyle,
  style,
  iconBefore,
  iconAfter,
  label,
  placeholderText,
  IconRightPress,
  ...rest
}: {
  containerStyle?: any;
  style?: any;
  iconBefore?: string;
  iconAfter?: string;
  label?: string;
  placeholderText?: string;
  IconRightPress?: any;
  secureTextEntry?: boolean;
}) => {
  return (
    <View>
      {label && (
        <Text style={tw`text-green mb-1 text-base font-poppins-medium`}>
          {label}
        </Text>
      )}
      <View
        style={[
          tw`flex-row items-center gap-4 bg-primary100 p-4 rounded-[8px]`,
          containerStyle,
        ]}
      >
        {iconBefore && <SvgXml xml={iconBefore} />}
        <TextInput
          placeholder={placeholderText || "No Placeholder Text"}
          style={[tw`font-poppins flex-1`, style]}
          placeholderTextColor="text-green"
          {...rest}
        />
        {iconAfter && (
          <TouchableOpacity onPress={IconRightPress}>
            <SvgXml xml={iconAfter} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputText;
