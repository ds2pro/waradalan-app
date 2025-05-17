import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useAppTheme } from "@/lib/context/ThemeContext";
import Colors from "@/constants/Colors";

export default function HomeButton() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const color = Colors[theme].text;

  return (
    <Pressable onPress={() => router.replace("/")}>
      <Ionicons name="home" size={20} color={color} />
    </Pressable>
  );
}
