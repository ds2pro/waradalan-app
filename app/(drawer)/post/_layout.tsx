import { Stack } from "expo-router";
import HomeButton from "@/components/HomeButton";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerRight: () => <HomeButton />,
        headerTintColor: "#000",
        headerTitleStyle: {
          fontSize: 14,
          color: "#000",
        },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
}
