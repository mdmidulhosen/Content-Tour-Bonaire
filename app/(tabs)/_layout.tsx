import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      initialRouteName="onboarding/onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="onboarding/onboarding" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
