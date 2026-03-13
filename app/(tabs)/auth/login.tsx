import { IconCloseEye, IconLock, IconMail, IconOpenEye } from "@/assets/icons";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import tw from "@/lib/tw";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={tw`h-full bg-white`}>
        <ScrollView
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={tw`flex-grow px-[4%] py-4 items-center justify-center`}
        >
          <View style={tw`w-full`}>
            <Text style={tw`text-green text-2xl font-poppins-bold text-center`}>
              Log in
            </Text>
            <Text style={tw`text-green text-sm font-poppins text-center mt-3`}>
              Enter correct information to access your account
            </Text>

            <View style={tw`gap-6 mt-16 w-full`}>
              <InputText
                label="Email"
                placeholderText="Enter your email"
                iconBefore={IconMail}
              />
              <InputText
                label="Password"
                placeholderText="Enter your password"
                iconBefore={IconLock}
                secureTextEntry={!showPassword}
                IconRightPress={() => setShowPassword((prev) => !prev)}
                iconAfter={showPassword ? IconOpenEye : IconCloseEye}
              />
            </View>
            <Button
              title="Log in"
              onPress={async () => {
                await Location.requestForegroundPermissionsAsync();
                router.push("/home");
              }}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
