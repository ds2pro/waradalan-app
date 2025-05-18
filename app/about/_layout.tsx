import { Stack } from "expo-router";

export default function AboutLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
    />
  );
}
