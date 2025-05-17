import { Stack } from "expo-router";
import HomeButton from "@/components/HomeButton";
import { useAppTheme } from "@/lib/context/ThemeContext";
import Colors from "@/constants/Colors";

export default function PostLayout() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerRight: () => <HomeButton />,
        headerTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          fontSize: 14,
          color: colors.text,
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
