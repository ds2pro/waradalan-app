import { Stack } from "expo-router";

export default function ContactLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
    />
  );
}
