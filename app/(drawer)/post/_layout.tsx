import { Stack } from "expo-router";
import HomeButton from "@/components/HomeButton";
import { useAppTheme } from "@/lib/context/ThemeContext";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

export default function PostLayout() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        headerTitleAlign: "center",
        headerRight: () => <HomeButton />,
        headerLeft: () => {
          const navigation = useNavigation();
          return (
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </Pressable>
          );
        },
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
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
