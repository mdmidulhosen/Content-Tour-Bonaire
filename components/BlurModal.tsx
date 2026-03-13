import tw from "@/lib/tw";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import { Animated, Modal, TouchableWithoutFeedback, View } from "react-native";

const BlurModal = ({
  open,
  onClose,
  content,
}: {
  open: boolean;
  onClose: () => void;
  content: React.ReactNode;
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          damping: 20,
          stiffness: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.95,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [open, opacity, scale]);

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 items-center justify-center`}>
        {/* Blurred Backdrop */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[tw`absolute inset-0`, { opacity }]}>
            <BlurView intensity={40} tint="dark" style={tw`absolute inset-0`} />
          </Animated.View>
        </TouchableWithoutFeedback>

        {/* Modal Card */}
        <Animated.View
          style={[
            tw`w-9/10 rounded-[32px] bg-white p-6 shadow-lg`,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          {/* Prevent backdrop tap from closing when tapping inside */}
          <TouchableWithoutFeedback>
            <View>{content}</View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BlurModal;
