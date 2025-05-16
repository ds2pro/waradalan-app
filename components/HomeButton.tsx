import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function HomeButton() {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.replace("/")}>
      <Ionicons name="home" size={20} />
    </Pressable>
  );
}
